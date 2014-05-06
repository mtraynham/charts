angular.module('charts').controller('Example4Ctrl', ['$scope', 'GeoConfigs', 'GeoProjectionFactory',
    function ($scope, GeoConfigs, GeoProjectionFactory) {
    $scope.configs = GeoConfigs.getConfigs();
    $scope.config = GeoConfigs.loadConfig($scope.configs.get('usStates'));
    $scope.projections = GeoProjectionFactory.types;
    $scope.projection = GeoProjectionFactory.create();

    // Chart 6
    var chart = dc.choroplethChart("#chart")
        .data(function (group) { return []; });
    chart.on("preRender", function (chart) {
        chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
    });
    chart.on("preRedraw", function (chart) {
        chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
    });

    $scope.$watch('config', function (newConfig, oldConfig) {
        if (newConfig === oldConfig) {
            return;
        }
        chart.overlayGeoJson(newConfig.getFeautres(), "Location", newConfig.getKeyAccessor());
        chart.redraw();
    });

    $scope.$watch('projection', function (newProjection, oldProjection) {
        if (newProjection === oldProjection) {
            return;
        }
        chart.projection(newProjection);
        chart.projectionZoom(newProjection.zoom);
        chart.redraw();
    });
}]);