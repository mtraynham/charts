angular.module('charts').service('CrossfilterService', function () {

    this.coerceNumber = function (number) {
        return number && !isNaN(number) ? +number : null;
    };

    this.coerceDate = function (timeFormat, date) {
        return date ? timeFormat.parse(date) : null;
    };

    this.coerceArray = function (array) {
        return array ? array.split(",").reduce(function (previous, current) {
            previous[current.trim()] = true;
            return previous;
        }, {}) : null;
    };

    this.coerceString = function (string) {
        return string ? string : null;
    };

    this.accessor = function (property) {
        return function (d) {
            return d[property];
        };
    };

    this.reduceAvg = function (group, accessor) {
        return group.reduce(function (p, v) {
            p.count++;
            p.sum += accessor(v);
            return p;
        }, function (p, v) {
            p.count--;
            p.sum -= accessor(v);
            return p;
        }, function (p) {
            return { count: 0, sum: 0, valueOf: function () {
                return this.count !== 0 ? this.sum / this.count : 0;
            }};
        });
    };

    this.reduceCount = function (group) {
        return group.reduce(function (p, v) {
            return ++p;
        }, function (p, v) {
            return --p;
        }, function (p) {
            return 0;
        });
    };

    this.reduceSum = function (group, accessor) {
        return group.reduce(function (p, v) {
            var val = accessor(v);
            return val !== null ? p += val : p;
        }, function (p, v) {
            var val = accessor(v);
            return val !== null ? p -= val : p;
        }, function (p) {
            return 0;
        });
    };


    this.avgOthersGrouper = function (_chart) {
        return function (topRows) {
            var topRowsCount = d3.sum(topRows, function (d) { return d.value.count; }),
                topRowsSum = d3.sum(topRows, function (d) { return d.value.sum; }),
                allRows = _chart.group().all(),
                allRowsCount = d3.sum(allRows, function (d) { return d.value.count; }),
                allRowsSum = d3.sum(allRows, function (d) { return d.value.sum; }),
                topKeys = topRows.map(_chart.keyAccessor()),
                allKeys = allRows.map(_chart.keyAccessor()),
                topSet = d3.set(topKeys),
                others = allKeys.filter(function (d) { return !topSet.has(d); });
            if (allRowsSum > topRowsSum) {
                return topRows.concat([{"others": others, "key": _chart.othersLabel(),
                    "value": (allRowsSum - topRowsSum) / (allRowsCount - topRowsCount)}]);
            }
            return topRows;
        };
    };
});
