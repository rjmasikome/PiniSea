MyApp
  .factory('Show', ['$resource', function($resource) {
    return {
    	metadata: $resource('/api/metakey')
    };
}]);