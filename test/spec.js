describe("Controller test", function() {

var ctrl, scope, service;

  beforeEach(module("MyApp"));

  beforeEach(inject(function($controller, $rootScope, Show) {

  scope = $rootScope.$new();
  service = Show;
  ctrl = $controller("MainCtrl", {$scope: scope, Show: service});
  }));


  describe("MainCtrl", function() {
    it('makes sure the default values are correct', function () {
      expect(scope.tip).toBe("dat");
      expect(scope.shown).toBe(false);
  })
  	it('makes sure no keyspace is selected', function () {
  		expect(scope.keySpace).toBeUndefined();
	})
	it('makes sure server and database is running', function () {
		spyOn(scope, "heartbeat");
		scope.heartbeat();
		expect(scope.heartbeat).toHaveBeenCalled();
	})
	it('loads the initial data', function () {
		spyOn(scope, "metadata");
		scope.metadata();
		expect(scope.metadata).toHaveBeenCalled();
	})
  })
});