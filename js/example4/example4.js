angular.module('charts').controller('Example4Ctrl', ['$scope', 'GeoConfigs', function ($scope, GeoConfigs) {
    $scope.configs = GeoConfigs.getConfigs();
}]);