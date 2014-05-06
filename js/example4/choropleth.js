(function () {
    dc.choroplethChart = function (parent, chartGroup) {
        var _chart = dc.colorMixin(dc.baseMixin({}));

        // PROPERTIES
        var _allFeatures = [],
            _layers = {},
            _graticule = d3.geo.graticule(),
            _projection = d3.geo.equirectangular(),
            _previousProjection = d3.geo.orthographic(),
            _path = d3.geo.path().projection(_projection),
            _projectionChanged = false,
            _projectionZoom = function (projection, features, height, width, scale) {
                // Reset scale & translate
                projection.scale(1).translate([0, 0]);
                // Calculate new position
                var b = d3.geo.path(projection).bounds(features),
                    s = (scale || 0.95) / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
                return projection.scale(s).translate(t);
            },
            _title = function (layerName, data, titleFn) {
                return function (d) {
                    var key = getKey(layerName, d),
                        value = data[key];
                    return titleFn({key: key, value: value});
                };
            },
            _layeredData = function (data) {
                return data.reduce(function (previous, current) {
                    previous[_chart.keyAccessor()(current)] = _chart.valueAccessor()(current);
                    return previous;
                }, {});
            };

        // DEFAULTS
        _chart.colorAccessor(function (d) {
            return d || 0;
        });

        // LAYER ACCESSORS
        function layerClass(layerName) {
            return "layer-" + layerName;
        }

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

        function getAllFeatures() {
            return _allFeatures;
        }

        function getLayer(layerName) {
            return _layers[layerName];
        }

        _chart.layers = function () {
            return _layers;
        }

        _chart.addLayer = function (features, name, keyAccessor) {
            _layers[name] = {
                features: features,
                name: name,
                keyAccessor: keyAccessor
            };
            _allFeatures = _allFeatures.concat(features);
            return _chart;
        };

        _chart.removeLayer = function (name) {
            delete _layers[name];
            _allFeatures = [];
            for (var key in _layers) {
                _allFeatures = _allFeatures.concat(getFeatures(key));
            }
            return _chart;
        };

        // PROJECTION & PATH
        _chart.path = function () {
            return _path;
        }

        _chart.projection = function (_) {
            if (!arguments.length) {
                return _projection;
            }
            _projectionChanged = true;
            _previousProjection = _projection;
            _projection = _;
            _path.projection(_projection);
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
            var data = _layeredData(_chart.data());

            for (var layerName in _layers) {
                // Select path
                var pathG = _chart.svg().selectAll(layerSelector(layerName) + " path");

                // Set selected color function
                var hasData = isDataLayer(layerName);
                pathG.classed("selected", hasData ? function (d) { return isSelected(layerName, d); } :
                    function () { return false; })
                    .classed("deselected", hasData ? function (d) { return isDeselected(layerName, d); } :
                    function () { return false; });

                // Update color
                dc.transition(pathG, _chart.transitionDuration()).attr("fill", function (d, i) {
                    return _chart.getColor(data[getKey(layerName, d)], i);
                });

                // Update title
                pathG.selectAll("title").text(_chart.renderTitle() ?
                    _title(layerName, data, _chart.title()) : function () { return ""; });
            }

            if (_projectionChanged) {
                var n = 0;
                dc.transition(_chart.svg().selectAll("g path"), _chart.transitionDuration())
                        .attrTween("d", function (d) {
                    var t = 0,
                        projection = d3.geo.projection(function (λ, φ) {
                            λ *= 180 / Math.PI;
                            φ *= 180 / Math.PI;
                            var p0 = _previousProjection([λ, φ]),
                                p1 = _projection([λ, φ]);
                            return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
                        }).scale(1).translate([_chart.width() / 2, _chart.height() / 2]),
                        path = d3.geo.path().projection(projection);

                    return function (_) {
                        t = _;
                        return path(d);
                    };
                })
                .each(function () { ++n; })
                .each("end", function () { if (!--n) { _projectionChanged = false } });
            }
        }

        _chart._doRender = function () {
            _chart.resetSvg();

            // Since we are rendering, no need to transform the projection
            _projectionChanged = false;

            // The graph
            var _g = _chart.svg().append("g");

            // Add graticule
            _g.append("path").attr("class", "graticule").datum(_graticule).attr('d', _path);

            // Add layers
            for (var layerName in _layers) {
                var pathG = _g.append("g").attr("class", layerClass(layerName))
                    .selectAll("path").data(getLayer(layerName).features)
                    .enter().append("path")
                        .attr("fill", "white")
                        .attr("d", _path)
                        .on("click", function (d) {
                            return _chart.onClick(d, layerName);
                        }).append("title");
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