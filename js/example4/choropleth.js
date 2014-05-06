(function () {
    dc.choroplethChart = function (parent, chartGroup) {
        var _chart = dc.colorMixin(dc.baseMixin({}));

        // PROPERTIES
        var _layers = {},
            _graticule = d3.geo.graticule(),
            _projection = d3.geo.mercator(),
            _previousProjection = d3.geo.mercator(),
            _path = d3.geo.path().projection(_projection),
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
            },
            _layeredData = function (data) {
                return data.reduce(function (previous, current) {
                    previous[_chart.keyAccessor()(current)] = _chart.valueAccessor()(current);
                    return previous;
                }, {});
            },
            _interpolatedProjection = function (a, b) {
                var projection = d3.geo.projection(function (λ, φ) {
                        var pa = a([λ *= 180 / Math.PI, φ *= 180 / Math.PI]), pb = b([λ, φ]);
                        return [(1 - α) * pa[0] + α * pb[0], (α - 1) * pa[1] - α * pb[1]];
                    }).scale(1),
                    center = projection.center,
                    translate = projection.translate,
                    α;

                projection.alpha = function (_) {
                    if (!arguments.length) {
                        return α;
                    }
                    α = +_;
                    var ca = a.center(), cb = b.center(),
                        ta = a.translate(), tb = b.translate();
                    center([(1 - α) * ca[0] + α * cb[0], (1 - α) * ca[1] + α * cb[1]]);
                    translate([(1 - α) * ta[0] + α * tb[0], (1 - α) * ta[1] + α * tb[1]]);
                    return projection;
                };

                delete projection.scale;
                delete projection.translate;
                delete projection.center;
                return projection.alpha(0);
            };

        // DEFAULTS
        _chart.colorAccessor(function (d) {
            return d || 0;
        });

        function projectionTween(projection0, projection1) {

        }

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
            _path.projection(_projection);
            // TODO ADD BACK
            // _path.projection(_interpolatedProjection(_previousProjection, _projection));
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

            _chart.svg().select('.graticule').datum(_graticule).attr("d", _path);

            for (var layerName in _layers) {
                // Select layer
                var layerG = _chart.svg().selectAll(layerSelector(layerName));

                // Select path
                var pathG = layerG.selectAll("path")
                    .data(getLayer(layerName).features);

                // Add enter items
                pathG.enter()
                    .append("path")
                    .attr("fill", "white")
                    .attr("d", _path)
                    .on("click", function (d) {
                        return _chart.onClick(d, layerName);
                    }).append("title");

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

                // Update path
                //pathG.attr("d", _path);
                // dc.transition(pathG, _chart.transitionDuration()).attr("d", function (d, i) {
                //     return _chart.getColor(data[getKey(layerName, d)], i);
                // });

                // TODO Transition projection

                layerG.selectAll("path title").text(_chart.renderTitle() ?
                    _title(layerName, data, _chart.title()) : function () { return ""; });
            }
        }

        _chart._doRender = function () {
            _chart.resetSvg();
            _chart.svg().append("path").attr("class", "graticule")
            for (var layerName in _layers) {
                _chart.svg().append("g").attr("class", layerClass(layerName));
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