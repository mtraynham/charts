dc.choroplethChart = (parent, chartGroup) ->
    _chart = dc.colorMixin(dc.baseMixin({}))
    _allFeatures = []
    _layers = {}
    _graticule = d3.geo.graticule()
    _projection = d3.geo.equirectangular()
    _previousProjection = d3.geo.orthographic()
    _path = d3.geo.path().projection _projection
    _projectionChanged = false
    _projectionZoom = (projection, features, height, width, scale) ->
        projection.scale 1
            .translate [0, 0]
        b = d3.geo.path projection
            .bounds(features)
        s = (scale or 0.95) / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]
        projection.scale(s)
            .translate(t)
    _title = (layerName, data, titleFn) ->
        (d) ->
            key = getKey layerName, d
            value = data[key]
            titleFn
                key: key,
                value: value
    _layeredData = (data) ->
        data.reduce (previous, current) ->
            previous[_chart.keyAccessor() current] = _chart.valueAccessor() current
            previous
        , {}

    _chart.colorAccessor (d) -> d || 0

    layerClass = (layerName) -> "layer-" + layerName
    layerSelector = (layerName) -> "g.layer-" + layerName
    isSelected = (layerName, d) -> _chart.hasFilter() and _chart.hasFilter getKey layerName, d;
    isDeselected = (layerName, d) -> _chart.hasFilter() and !_chart.hasFilter getKey layerName, d
    isDataLayer = (layerName) -> getLayer(layerName) .keyAccessor
    getKey = (layerName, d) -> getLayer(layerName).keyAccessor d
    getFeatures = (layerName) -> getLayer(layerName).features
    getAllFeatures -> _allFeatures
    getLayer = (layerName) -> _layers[layerName]

    _chart.addLayer = (features, name, keyAccessor) ->
        _layers[name] =
            features: features
            name: name
            keyAccessor: keyAccessor
        _allFeatures = _allFeatures.concat features
        _chart

    _chart.removeLayer = (name) ->
        delete _layers[name]
        _allFeatures = []
        for key of _layers
            _allFeatures = _allFeatures.concat getFeatures key
        _chart

    _chart.path = ->
        _path

    _chart.projection = (_) ->
        if !arguments.length
            _projection
        else
            _projectionChanged = true
            _previousProjection = _projection
            _projection = _
            _path.projection _projection
            _chart;

    _chart.projectionZoom = (_) ->
        if !arguments.length
            _projectionZoom
        else
            _projectionZoom = _
            _chart

    _chart._doRedraw = ->
        data = _layeredData chart.data()
        for layerName of _layers
            pathG = _chart.svg().selectAll layerSelector(layerName) + " path"
            hasData = isDataLayer layerName
            pathG.classed 'selected', if hasData then (d) -> isSelected layerName, d else false
            pathG.classed 'deselected', if hasData then (d) -> isDeselected layerName, d else false
            dc.transition pathG, _chart.transitionDuration()
                .attr('fill', (d, i) -> _chart.getColor data[getKey layerName, d], i)
            pathG.selectAll('title').text if _chart.renderTitle() then _title layerName, data, _chart.title() else -> ""

            if _projectionChanged
                n = 0
                dc.transition _chart.svg().selectAll('g path'), _chart.transitionDuration()
                    .attrTween "d", (d) ->
                        t = 0
                        projection = d3.geo.projection (λ, φ) ->
                            λ *= 180 / Math.PI
                            φ *= 180 / Math.PI
                            p0 = _previousProjection [λ, φ]
                            p1 = _projection [λ, φ]
                            [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]]
                        projection.scale _projection.scale()
                            .translate _projection.translate()
                        path = d3.geo.path().projection projection

                        (_) ->
                            t = _
                            path(d)
        _chart

    _chart._doRedraw = ->
        _chart.resetSvg()
        _projectionChanged = false
        _g = _chart.svg().append 'g'
        _g.append 'path'
            .attr 'class', 'graticule'
            .datum _graticule
            .attr 'd', _path
        for layerName of _layers
            _g.append 'path'
                .attr 'class', layerClass layerName
                .selectAll 'path'
                .data getFeatures layerName
                .enter
                .append 'path'
                .attr 'fill', 'white'
                .attr 'd', _path
                .on 'click', (d) ->
                    _chart.onClick d, layerName
                .append('title')
        _chart._doRedraw()

    _chart.onClick = (d, layerName) ->
        selectedRegion = getKey layerName, d
        dc.events.trigger ->
            _chart.filter selectedRegion
            _chart.redrawGroup()
        _chart

    _chart.anchor parent, chartGroup