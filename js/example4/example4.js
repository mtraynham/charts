angular.module('charts').controller('Example4Ctrl', ['$scope', 'GeoService', function ($scope, GeoService) {
    $scope.configs = GeoService.getConfigs();
}]);