var mmhome = angular.module('mmhome', [
    'ngRoute']);

mmhome
  .controller('index_controller', function() {
  })

  .config(function($routeProvider, $locationProvider) {
    var index = {
      templateUrl: 'tpl/index.html',
      controller: 'index_controller'
    };
    $routeProvider
      .when('/', index);
    $locationProvider.html5Mode(true);
  });
