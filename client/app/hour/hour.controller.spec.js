'use strict';

describe('Controller: HourCtrl', function () {

  // load the controller's module
  beforeEach(module('meanVoServerApp'));

  var HourCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HourCtrl = $controller('HourCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
