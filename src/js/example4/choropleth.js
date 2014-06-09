(function () {
    dc.choroplethChart = function (parent, chartGroup) {
        var _chart = dc.colorMixin(dc.baseMixin({}));

        // PROPERTIES
        var _allFeatures = {type: 'FeatureCollection', features: [] },
            _layers = {},
            _layeredData = function (data) {
                return data.reduce(function (previous, current) {
                    previous[_chart.keyAccessor()(current)] = _chart.valueAccessor()(current);
                    return previous;
                }, {});
            },
            _graticule = d3.geo.graticule(),
            _projection = d3.geo.equirectangular(),
            _previousProjection = d3.geo.orthographic(),
            _path = d3.geo.path().projection(_projection),
            _projectionChanged = false,
            _projectionZoom = function (path, features, width, height, scale) {
                var projection = path.projection();
                projection.scale(1).translate([0, 0]);
                if (projection.rotate) {
                    projection.rotate([0, 0]);
                }
                if (projection.center) {
                    projection.center([0, 0]);
                }
                var b = path.bounds(features),
                    s = (scale || 0.95) / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
                if (!projection.rotate || !projection.center) {
                    if (s !== 0) {
                        projection
                            .translate([(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2])
                            .scale(s);
                    } else {
                        projection
                            .translate([ width / 2, height / 2 ])
                            .scale(Math.min(width, height)  * 2);
                    }
                } else {
                    var bounds = d3.geo.bounds(features);
                    projection
                        .rotate([-(bounds[0][0] + bounds[1][0]) / 2, 0])
                        .center([0, (bounds[0][1] + bounds[1][1]) / 2])
                        .translate([width / 2, height / 2])
                        .scale(s);
                }
            },
            _projectionTween = function (projectionA, projectionB, width, height) {
                return function (d) {
                    var t = 0,
                        projection = d3.geo.projection(function (λ, φ) {
                            λ *= 180 / Math.PI;
                            φ *= 180 / Math.PI;
                            var p0 = projectionA([λ, φ]),
                                p1 = projectionB([λ, φ]);
                            return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
                        }).scale(1).translate([width / 2, height / 2]),
                        path = d3.geo.path().projection(projection);

                    return function (_) {
                        t = _;
                        return path(d);
                    };
                };
            },
            _title = function (layerName, data, titleFn) {
                return function (d) {
                    return titleFn({
                        key: getKey(layerName, d),
                        title: getTitle(layerName, d),
                        value: data[this.key]
                    })
                };
            },
            _showGraticule = false,
            _showSphere = false,
            _zoom = d3.geo.zoom().projection(_projection);

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

        function getTitle(layerName, d) {
            return getLayer(layerName).titleAccessor(d);
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
        };

        _chart.addLayer = function (features, name, keyAccessor, titleAccessor) {
            _layers[name] = {
                features: features,
                name: name,
                keyAccessor: keyAccessor,
                titleAccessor: titleAccessor
            };
            _allFeatures.features = _allFeatures.features.concat(features);
            return _chart;
        };

        _chart.removeLayer = function (name) {
            delete _layers[name];
            _allFeatures.features = [];
            for (var key in _layers) {
                _allFeatures.features = _allFeatures.features.concat(getFeatures(key));
            }
            return _chart;
        };

        // PROJECTION & PATH
        _chart.path = function () {
            return _path;
        };

        _chart.projection = function (_) {
            if (!arguments.length) {
                return _projection;
            }
            _projectionChanged = true;
            _previousProjection = _projection;
            _projection = _;
            _path.projection(_projection);
            _zoom.projection(_projection);
            return _chart;
        };

        _chart.projectionZoom = function (_) {
            if (!arguments.length) {
                return _projectionZoom;
            }
            _projectionZoom = _;
            return _chart;
        };

        _chart.projectionTween = function (_) {
            if (!arguments.length) {
                return _projectionTween;
            }
            _projectionTween = _;
            return _chart;
        };

        _chart.showGraticule = function (_) {
            if (!arguments.length) {
                return _showGraticule;
            }
            _showGraticule = _;
            return _chart;
        };

        _chart.showSphere = function (_) {
            if (!arguments.length) {
                return _showSphere;
            }
            _showSphere = _;
            return _chart;
        };

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

            // Update the projection
            if (_projectionChanged) {
                _projectionZoom(_path, _allFeatures, _chart.width(), _chart.height());
                _chart.svg().selectAll("g path").attr("d", _path);
                _projectionChanged = false;
            }

            return _chart;
        };

        _chart._doRender = function () {
            _chart.resetSvg();

            _chart.svg().call(_zoom
                .translate(_projection.translate())
                .scale(_projection.scale())
                .on("zoom.redraw", function () {
                    d3.event.sourceEvent.preventDefault();
                    _chart.svg().selectAll("path").attr("d", _path);
                }));

            // Since we are rendering, no need to transform the projection
            _projectionChanged = false;

            // The graph
            var _g = _chart.svg().append("g");

            // Zoom on the current features
            _projectionZoom(_path, _allFeatures, _chart.width(), _chart.height());

            // Add graticule
            if (_showGraticule) {
                _g.append("path").attr("class", "graticule").datum(_graticule).attr('d', _path);
            }

            // Add sphere
            if (_showSphere) {
                _g.append("path").attr("class", "sphere").datum({type: "Sphere"}).attr('d', _path);
            }

            // Add layers
            for (var layerName in _layers) {
                var pathG = _g.append("g").attr("class", layerClass(layerName))
                    .selectAll("path").data(getFeatures(layerName))
                    .enter().append("path")
                        .attr("fill", "white")
                        .attr("d", _path)
                        .on("click", function (d) {
                            return _chart.onClick(d, layerName);
                        }).append("title");
            }
            return _chart._doRedraw();
        };

        _chart.onClick = function (d, layerName) {
            var selectedRegion = getKey(layerName, d);
            dc.events.trigger(function () {
                _chart.filter(selectedRegion);
                _chart.redrawGroup();
            });
        };

        return _chart.anchor(parent, chartGroup);
    };
})();