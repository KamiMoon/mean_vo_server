'use strict';

describe('Controller: OrganizationCtrl', function () {

  // load the controller's module
  beforeEach(module('meanVoServerApp'));

  var OrganizationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganizationCtrl = $controller('OrganizationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
