'use strict';

describe('Service: OrganizationService', function () {

  // load the service's module
  beforeEach(module('meanVoServerApp'));

  // instantiate service
  var OrganizationService;
  beforeEach(inject(function (_OrganizationService_) {
    OrganizationService = _OrganizationService_;
  }));

  it('should do something', function () {
    expect(!!OrganizationService).toBe(true);
  });

});
