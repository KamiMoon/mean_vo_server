'use strict';

describe('Controller: EventCtrl', function () {

  // load the controller's module
  beforeEach(module('meanVoServerApp'));

  var EventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventCtrl = $controller('EventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
