'use strict';

describe('Controllers: Organization', function() {

    // load the controller's module
    beforeEach(module('meanVoServerApp'));

    var httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('OrganizationCtrl', function() {

        var OrganizationCtrl;
        var scope;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            OrganizationCtrl = $controller('OrganizationCtrl', {
                $scope: scope
            });
        }));


        it('should have a list of organizations when loaded', function() {
            var responseData = [{
                _id: 1
            }, {
                _id: 2
            }];

            httpBackend.expect('GET', '/api/organizations')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.organizations[0]._id).toEqual(responseData[0]._id);

        });

        it('should search for organizations by search params', function() {
            var responseData = [{
                _id: 1
            }, {
                _id: 2
            }];

            httpBackend.expect('GET', '/api/organizations')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.organizations[0]._id).toEqual(responseData[0]._id);

            httpBackend.expect('GET', '/api/organizations')
                .respond(responseData);

            scope.$apply(function() {
                scope.search();
            });

            httpBackend.flush();

            expect(scope.organizations[0]._id).toEqual(responseData[0]._id);


        });

        //TODO: how do I unit test a confirm?
        xit('should delete an organization', function() {
            var responseData = [{
                _id: 1
            }, {
                _id: 2
            }];

            httpBackend.expect('GET', '/api/organizations')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.organizations[0]._id).toEqual(responseData[0]._id);

            httpBackend.expect('DELETE', '/api/organizations/1')
                .respond(responseData);

            scope.$apply(function() {
                scope.delete(1);
            });

            httpBackend.flush();


        });

    });

    describe('OrganizationAddCtrl', function() {

        var Ctrl;
        var scope;
        var location;

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            location = _$location_;
            scope = $rootScope.$new();
            Ctrl = $controller('OrganizationAddCtrl', {
                $scope: scope
            });
        }));

        it('should save an organization', function() {
            var responseData = {
                '_id': 1
            };

            httpBackend.expect('POST', '/api/organizations')
                .respond(responseData);

            scope.$apply(function() {
                scope.save({
                    $valid: true
                });
            });

            httpBackend.flush();

            expect(location.path()).toBe('/organization/view/1');


        });

    });

    describe('OrganizationEditCtrl', function() {

        var Ctrl;
        var scope;
        var location;

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            location = _$location_;
            scope = $rootScope.$new();
            Ctrl = $controller('OrganizationEditCtrl', {
                $scope: scope,
                $stateParams: {
                    id: 1
                }
            });
        }));

        it('should get an organization', function() {
            var responseData = {
                _id: 1
            };

            httpBackend.expect('GET', '/api/organizations/1')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.organization._id).toEqual(1);

        });

        it('should save an organization', function() {
            var responseData = {
                _id: 1
            };

            httpBackend.expect('GET', '/api/organizations/1')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.organization._id).toEqual(1);

            httpBackend.expect('PUT', '/api/organizations/1')
                .respond(responseData);

            scope.$apply(function() {
                scope.save();
            });

            httpBackend.flush();

        });

    });

    describe('OrganizationViewCtrl', function() {

        var Ctrl;
        var scope;
        var location;

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            location = _$location_;
            scope = $rootScope.$new();
            Ctrl = $controller('OrganizationViewCtrl', {
                $scope: scope,
                $stateParams: {
                    id: 1
                }
            });
        }));

        it('should get an organization', function() {
            var responseData = {
                _id: 1
            };

            httpBackend.expect('GET', '/api/organizations/1')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.organization._id).toEqual(1);

        });

    });

});