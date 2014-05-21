angular.module('charts').controller('Example4Ctrl', ['$scope', 'GeoConfigs', 'GeoProjectionFactory2', 'GeoService',
    function ($scope, GeoConfigs, GeoProjectionFactory2, GeoService) {

    var chart = dc.choroplethChart("#chart")

    $scope.projections = GeoProjectionFactory2.types;

    $scope.$watch('projectionType', function (newProjectionType, oldProjectionType) {
        if (newProjectionType === oldProjectionType) {
            return;
        }
        var projection = new GeoProjectionFactory2.types[newProjectionType]()
        chart.projection(projection.projection);
        // chart.projectionZoom(projection.zoom);
        chart.redraw();
    });

    // TESTING CHARTS

    // Ignored datums (Country Name)
    var ignoredDatums = d3.set([
        "Arab World",
        "Caribbean small states",
        "Channel Islands",
        "East Asia & Pacific (all income levels)",
        "East Asia & Pacific (developing only)",
        "East Asia and the Pacific (IFC classification)",
        "Euro area",
        "Europe & Central Asia (all income levels)",
        "Europe & Central Asia (developing only)",
        "Europe and Central Asia (IFC classification)",
        "European Union",
        "Heavily indebted poor countries (HIPC)",
        "High income: nonOECD",
        "High income: OECD",
        "High income",
        "Latin America & Caribbean (all income levels)",
        "Latin America & Caribbean (developing only)",
        "Latin America and the Caribbean (IFC classification)",
        "Least developed countries: UN classification",
        "Low & middle income",
        "Low income",
        "Lower middle income",
        "Middle East & North Africa (all income levels)",
        "Middle East & North Africa (developing only)",
        "Middle East and North Africa (IFC classification)",
        "Middle income",
        "North America",
        "Not classified",
        "OECD members",
        "Other small states",
        "Pacific island small states",
        "Small states",
        "South Asia (IFC classification)",
        "South Asia",
        "Sub-Saharan Africa (all income levels)",
        "Sub-Saharan Africa (developing only)",
        "Sub-Saharan Africa (IFC classification)",
        "Turks and Caicos Islands",
        "Upper middle income",
        "World"
    ]);

    // D3 Formats
    var yearFormat = d3.time.format("%Y"),
        priceFormat = d3.format('$s');

    /**
     * Handles parsing of CSV data.
     * Parse the rows
     * Reduces by year
     * Nests by Country Name, Year
     * Flattens keys of nest
     */
    function parseData(data, callback) {
        d3.csv(data, function (row) {
            if (ignoredDatums.has(row["Country Name"])) {
                return null;
            }
            if (GeoService.countryISO3to2.has(row["Country Code"])) {
                row["Country Code"] = GeoService.countryISO3to2.get(row["Country Code"]);
            }
            var years = [];
            for (var key in row) {
                if (key === "") {
                    delete row[key];
                } else if (!isNaN(key)) {
                    years.push({year: key, value: !isNaN(row[key]) ? +row[key] : 0});
                    delete row[key];
                }
            }
            row.years = years;
            return row;
        }, function (data) {
            data = data.reduce(function (previous, current) {
                for (var i = 0; i < current.years.length; i++) {
                    previous.push({
                        "Country Name" : current["Country Name"],
                        "Country Code" : current["Country Code"],
                        "Indicator Name" : current["Indicator Name"],
                        "Indicator Code" : current["Indicator Code"],
                        "Year" : current.years[i].year,
                        "Value" : current.years[i].value
                    });
                }
                return previous;
            }, []);
            data = d3.nest()
                .key(function (d) { return d["Country Name"]; })
                .key(function (d) { return d.Year; })
                .rollup(function (values) {
                    return values.reduce(function (previous, current) {
                        previous["Country Code"] = current["Country Code"];
                        previous[current["Indicator Name"]] = current.Value;
                        return previous;
                    }, {});
                })
                .entries(data);
            data = data.reduce(function (previous, current) {
                var countryName = current.key;
                var countryValues = current.values;
                for (var i = 0; i < countryValues.length; i++) {
                    var year  = countryValues[i].key;
                    var yearValues = countryValues[i].values;
                    yearValues["Country Name"] = countryName;
                    yearValues.Year = yearFormat.parse(year);
                    previous.push(yearValues);
                }
                return previous;
            }, []);
            callback(null, data);
        });
    }

    /**
     * Rendering of data
     */
    function render(error, data, worldGeoFeatures, usGeoFeatures) {

        // Easy accessor function
        var accessor = function (property) {
            return function (d) {
                return d[property];
            };
        };

        // Accessors
        var countryNameAccessor = accessor("Country Name"),
            countryCodeAccessor = accessor("Country Code"),
            yearAccessor = accessor("Year"),
            paymentsAccessor = accessor("Charges for the use of intellectual property, payments (BoP, current US$)"),
            receiptsAccessor = accessor("Charges for the use of intellectual property, receipts (BoP, current US$)");

        // Crossfilter Index
        var index = crossfilter(data);

        // Chart
        var dimension = index.dimension(countryCodeAccessor),
            group = dimension.group().reduceSum(receiptsAccessor);
        chart.dimension(dimension)
            .group(group)
            .title(function (d) {
                return "Country: " + d.title +
                    "\n" + "Value: " + d.value;
            })
        chart.on("preRender", function (chart) {
            chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
        });
        chart.on("preRedraw", function (chart) {
            chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
        });

        GeoConfigs.loadConfig(GeoConfigs.getConfig('usStates1'), function (config) {
            chart.addLayer(config.getFeatures().features, 'usStates1', config.getKeyAccessor(),
                config.getTitleAccessor());
            chart.render();
        });
    }

    var q = queue();
    q.defer(parseData, 'data/14_Topic_en_csv_v2/14_Topic_en_csv_v2.csv');
    q.await(render);
}]);