angular.module('charts').controller('Example4Ctrl', ['$scope', 'GeoConfigs', 'GeoProjectionFactory',
    function ($scope, GeoConfigs, GeoProjectionFactory) {
    $scope.configs = GeoConfigs.getConfigs();
    $scope.config = GeoConfigs.loadConfig($scope.configs.get('usStates'));
    $scope.projections = GeoProjectionFactory.types;
    $scope.projection = GeoProjectionFactory.create();

    $scope.$watch('config', function (newConfig, oldConfig) {
        if (newConfig === oldConfig) {
            return;
        }
        //_chart.overlayGeoJson
    });

    $scope.$watch('projection', function (newProjection, oldProjection) {
        if (newProjection === oldProjection) {
            return;
        }
        // chart.projection
    });
}]);