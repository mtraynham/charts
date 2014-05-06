(function () {
    dc.choroplethChart = function (parent, chartGroup) {
        var _chart = dc.colorMixin(dc.baseMixin({}));

        // PROPERTIES
        var _layers = {},
            _path = d3.geo.path(),
            _projection = d3.geo.mercator(),
            _previousProjection = d3.geo.mercator(),
            _projectionZoom = function (path, features, height, width, scale) {
                // Reset scale & translate
                path.projection().scale(1).translate([0, 0]);
                // Calculate new position
                var b = path.bounds(features),
                    s = (scale || 0.95) / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
                return path.projection().scale(s).translate(t);
            },
            _title = function (layerName, data, titleFn) {
                return function (d) {
                    var key = getKey(layerName, d),
                        value = data[key];
                    return titleFn({key: key, value: value});
                };
            };

        // DEFAULTS
        _chart.colorAccessor(function (d) {
            return d || 0;
        }).data(function (group) {
            return group.all().reduce(function (previous, current) {
                previous[_chart.keyAccessor()(current)] = _chart.valueAccessor()(current);
                return previous;
            }, {});
        })

        // LAYER ACCESSORS
        function layerSelector(layerName) {
            return "g.layer-" + layerName;
        }

        function isSelected(layerName, d) {
            return _chart.hasFilter() && _chart.hasFilter(getKey(layerName, d));
        }

        function isDeselected(layerName, d) {
            return _chart.hasFilter() && !_chart.hasFilter(getKey(layerName, d));
        }

        function isDataLayer(layerName) {
            return getLayer(layerName).keyAccessor;
        }

        function getKey(layerName, d) {
            return getLayer(layerName).keyAccessor(d);
        }

        function getFeatures(layerName) {
            return getLayer(layerName).features;
        }

        function getLayer(layerName) {
            return _layers[layerName];
        }

        _chart.getLayers = function () {
            return _layers;
        }

        _chart.addLayer = function (features, name, keyAccessor) {
            _layers[name] = {
                features: features,
                name: name,
                keyAccessor: keyAccessor
            };
            return _chart;
        };

        _chart.removeLayer = function (name) {
            delete _layers[name];
        };

        // PROJECTION & PATH
        _chart.path = function () {
            return _path;
        }

        _chart.projection = function (_) {
            if (!arguments.length) {
                return _projection;
            }
            _previousProjection = _projection;
            _projection = _;
            _path.projection(_);
            return _chart;
        };

        _chart.projectionZoom = function (_) {
            if (!arguments.length) {
                return _projectionZoom;
            }
            _projectionZoom = _;
            return _chart;
        }

        // PLOT
        _chart._doRedraw = function () {
            var data = _chart.data();

            for (var layerName in _layers) {
                var hasData = isDataLayer(layerName);
                var regionG = _chart.svg().selectAll(layerSelector(layerName));
                if (hasData) {
                    regionG.classed("selected", function (d) {
                            return isSelected(layerName, d);
                        })
                        .classed("deselected", function (d) {
                            return isDeselected(layerName, d);
                        })
                        .attr("class", function (d) {
                            var layerNameClass = layerName;
                            var regionClass = dc.utils.nameToId(getLayer(layerName).keyAccessor(d));
                            var baseClasses = layerNameClass + " " + regionClass;
                            if (isSelected(layerName, d)) {
                                baseClasses += " selected";
                            }
                            if (isDeselected(layerName, d)) {
                                baseClasses += " deselected";
                            }
                            return baseClasses;
                        });
                }

                var paths = regionG.select("path")
                    .attr("fill", function () {
                        var currentFill = d3.select(this).attr("fill");
                        if (currentFill) {
                            return currentFill;
                        }
                        return "none";
                    })
                    .attr("d", _path)
                    .on("click", function (d) {
                        return _chart.onClick(d, layerName);
                    });

                dc.transition(paths, _chart.transitionDuration()).attr("fill", function (d, i) {
                    return _chart.getColor(data[getKey(layerName, d)], i);
                });

                regionG.selectAll("title").text(_chart.renderTitle() ?
                    _title(layerName, data, _chart.title()) : function () { return ""; });
            }
        }

        _chart._doRender = function () {
            _chart.resetSvg();
            for (var layerName in _layers) {
                var layer = _chart.svg().append("g").attr("class", "layer" + layerName);
                var region = layer.selectAll("g." + layerName);
                region.enter().append("g").attr("class", layerName);
                region.append("path").attr("fill", "white").attr("d", _path);
                region.append("title");
            }
            _chart._doRedraw();
        };

        _chart.onClick = function (d, layerIndex) {
            var selectedRegion = getLayer(layerIndex).keyAccessor(d);
            dc.events.trigger(function () {
                _chart.filter(selectedRegion);
                _chart.redrawGroup();
            });
        };

        return _chart.anchor(parent, chartGroup);
    };
})();