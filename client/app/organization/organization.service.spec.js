'use strict';

describe('Service: organization', function() {

    // load the service's module
    beforeEach(module('meanVoServerApp'));

    // instantiate service
    var OrganizationService;
    var httpBackend;

    beforeEach(inject(function(_OrganizationService_, $httpBackend) {
        OrganizationService = _OrganizationService_;
        httpBackend = $httpBackend;
    }));

    it('should do something', function() {
        expect(!!OrganizationService).toBe(true);
    });

    it('should get a list of organizations', function() {
        httpBackend.expectGET('/api/organizations')
            .respond([{
                '_id': 1
            }]);

        OrganizationService.query({});

        httpBackend.flush();
    });

    it('should get an organization', function() {

        httpBackend.expectGET('/api/organizations/1')
            .respond({
                '_id': 1
            });

        OrganizationService.get({
            id: 1
        });

        httpBackend.flush();
    });

    it('should create an organization', function() {
        httpBackend.expectPOST('/api/organizations')
            .respond({
                '_id': 1
            });

        OrganizationService.save({
            id: 1
        });

        httpBackend.flush();
    });

    it('should update an organization', function() {
        httpBackend.expectPUT('/api/organizations/1')
            .respond({
                '_id': 1
            });

        OrganizationService.update({
            id: 1
        }, {
            id: 1
        });

        httpBackend.flush();
    });

    it('should delete an organization', function() {
        httpBackend.expectDELETE('/api/organizations/1')
            .respond({
                '_id': 1
            });

        OrganizationService.delete({
            id: 1
        });

        httpBackend.flush();
    });

});