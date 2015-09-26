'use strict';

describe('Controller: RegistrationCtrl', function () {

  // load the controller's module
  beforeEach(module('meanVoServerApp'));

  var RegistrationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationCtrl = $controller('RegistrationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
