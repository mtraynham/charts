(function() {
    dc.gauge = function(parent, chartGroup) {
        var _chart = dc.colorMixin(dc.baseMixin({}));

        var _sliceCssClass = "pie-slice";

        var _domain = [ 0, 100 ];
        var _gap = 1;
        var _externalLabelRadius = 0;
        var _innerRadiusPercentage = 0.5;
        var _radius = 0;
        var _maxAngle = 90;
        var _minAngle = -90;
        var _showLabels = false;
        var _slices = 5;

        function deg2rad(deg) {
            return deg * Math.PI / 180;
        }

        function fill(d, i) {
            return _chart.getColor(d.data, i);
        }

        function safeArc(d, i, arc) {
            var path = arc(d, i);
            if (path.indexOf("NaN") >= 0) {
                path = "M0,0";
            }
            return path;
        }

        function tweenPie(radius, innerRadius) {
            return function(b) {
                b.innerRadius = innerRadius;
                var current = this._current;
                if (!current || isNaN(current.startAngle) || isNaN(current.endAngle)) {
                    current = {
                        startAngle : 0,
                        endAngle : 0
                    };
                }
                var i = d3.interpolate(current, b);
                this._current = i(0);
                return function(t) {
                    return safeArc(i(t), 0, d3.svg.arc().outerRadius(radius).innerRadius(innerRadius));
                };
            };
        }

        function positionLabels(labels, arc, radius, externalLabelRadius) {
            dc.transition(labels, _chart.transitionDuration()).attr("transform", function(d) {
                var centroid;
                if (externalLabelRadius) {
                    centroid = d3.svg.arc().outerRadius(radius + externalLabelRadius).innerRadius(radius + externalLabelRadius).centroid(d);
                } else {
                    centroid = arc.centroid(d);
                }
                if (isNaN(centroid[0]) || isNaN(centroid[1])) {
                    return "translate(0,0)";
                } else {
                    return "translate(" + centroid + ")";
                }
            }).attr("text-anchor", "middle").text(function(d) {
                var data = d.data;
                return _chart.label()(d.data);
            });
        }

        function drawChart() {
            // set radius on basis of chart dimension if missing
            var radius = (_radius ? _radius : Math.min(_chart.width() / 2, _chart.height())) - _externalLabelRadius;
            var innerRadius = (_innerRadiusPercentage !== null ? Math.max(Math.min(_innerRadiusPercentage, 1), 0) : 0.5) * radius;
            var labelData = d3.scale.linear().range([0, 1]).domain(_domain).ticks(_slices);
            var data = d3.range(_slices).map(function() { return 1/_slices; }).map(function(d, i) {
                return { key: i, value: d };
            });

            var startRadian = deg2rad(_minAngle);
            var endRadian = deg2rad(_maxAngle);

            var arc = d3.svg.arc().outerRadius(radius).innerRadius(innerRadius);
            var pie = d3.layout.pie().sort(null).startAngle(startRadian).endAngle(endRadian).value(_chart.valueAccessor());
            var pieData = pie(data);

            if (_g) {
                // Get slices
                var slices = _g.selectAll("g." + _sliceCssClass).data(pieData);

                // Create elements
                var slicesEnter = slices.enter().append("g").attr("class", function(d, i) {
                    return _sliceCssClass + " _" + i;
                });
                var slicePath = slicesEnter.append("path").attr("fill", fill).attr("d", function(d, i) {
                    return safeArc(d, i, arc);
                });
                dc.transition(slicePath, _chart.transitionDuration(), function(s) {
                    s.attrTween("d", tweenPie(radius, innerRadius, endRadian, endRadian));
                });

                // Update elements
                var slicePaths = _g.selectAll("g." + _sliceCssClass).data(pieData).select("path").attr("d", function(d, i) {
                    return safeArc(d, i, arc);
                });
                dc.transition(slicePaths, _chart.transitionDuration(), function(s) {
                    s.attrTween("d", tweenPie(radius, innerRadius, endRadian, endRadian));
                }).attr("fill", fill);

                // Remove elements
                slices.exit().remove();

//                // Update Labels
//                var labels = _g.selectAll("text." + _sliceCssClass);
//                if (_chart.renderLabel()) {
//                    labels.data(pieData);
//                    labels.exit().remove();
//                    var labelsEnter = labels.enter().append("text").attr("class", function(d, i) {
//                        var classes = _sliceCssClass + " _" + i;
//                        if (_externalLabelRadius) {
//                            classes += " external";
//                        }
//                        return classes;
//                    });
//                    positionLabels(labels, arc, radius, _externalLabelRadius);
//                }
            }
        }

        _chart._doRender = function() {
            _chart.resetSvg();
            _g = _chart.svg().append("g")
                .attr("transform", "translate(" + (_chart.width() / 2) + ", " + _chart.height() + ")");
            drawChart();
            return _chart;
        };

        _chart._doRedraw = function() {
            drawChart();
            return _chart;
        };

        _chart.domain = function(_) {
            if (!arguments.length) {
                return _domain;
            }
            _domain = _;
            return _chart;
        };

        _chart.externalLabelRadius = function(_) {
            if (!arguments.length) {
                return _externalLabelRadius;
            }
            _externalLabelRadius = _;
            return _chart;
        };

        _chart.gap = function(_) {
            if (!arguments.length) {
                return _gap;
            }
            _gap = _;
            return _chart;
        };

        _chart.innerRadiusPercentage = function(_) {
            if (!arguments.length) {
                return _innerRadiusPercentage;
            }
            _innerRadiusPercentage = _;
            return _chart;
        };

        _chart.maxAngle = function(_) {
            if (!arguments.length) {
                return _maxAngle;
            }
            _maxAngle = _;
            return _chart;
        };

        _chart.minAngle = function(_) {
            if (!arguments.length) {
                return _minAngle;
            }
            _minAngle = _;
            return _chart;
        };

        _chart.radius = function(_) {
            if (!arguments.length) {
                return _radius;
            }
            _radius = _;
            return _chart;
        };

        _chart.slices = function(_) {
            if (!arguments.length) {
                return _slices;
            }
            _slices = _;
            return _chart;
        };

        return _chart.anchor(parent, chartGroup);
    };
})();
