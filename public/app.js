var MyApp = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'uiGmapgoogle-maps'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
	  .when('/', {
	    templateUrl: 'views/explore.html',
	    controller: 'MainCtrl'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });

  }]);