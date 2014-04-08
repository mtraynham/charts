angular.module('charts').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('example1', {
            url: '/example1',
            templateUrl : 'example1/example1.tpl.html',
            controller : 'Example1Ctrl'
        })
        .state('example2', {
            url: '/example2',
            templateUrl : 'example2/example2.tpl.html',
            controller : 'Example2Ctrl'
        })
        .state('example3', {
            url: '/example3',
            templateUrl : 'example3/example3.tpl.html',
            controller : 'Example3Ctrl'
        });

    $urlRouterProvider.otherwise("/example1");

} ]).controller('AppCtrl', [ '$scope', '$state', function($scope, $state) {
    $scope.$state = $state;

} ]);
