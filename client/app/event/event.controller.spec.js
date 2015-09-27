'use strict';

describe('Controllers: Event', function() {

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

    describe('EventCtrl', function() {

        var EventCtrl;
        var scope;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            EventCtrl = $controller('EventCtrl', {
                $scope: scope
            });
        }));


        it('should have a list of Events when loaded', function() {
            var responseData = [{
                _id: 1
            }, {
                _id: 2
            }];

            httpBackend.expect('GET', '/api/events')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.events[0]._id).toEqual(responseData[0]._id);

        });

        xit('should search for Events by search params', function() {
            var responseData = [{
                _id: 1
            }, {
                _id: 2
            }];

            httpBackend.expect('GET', '/api/events')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.events[0]._id).toEqual(responseData[0]._id);

            httpBackend.expect('GET', '/api/events')
                .respond(responseData);

            scope.$apply(function() {
                scope.search();
            });

            httpBackend.flush();

            expect(scope.events[0]._id).toEqual(responseData[0]._id);


        });

        //TODO: how do I unit test a confirm?
        xit('should delete an Event', function() {
            var responseData = [{
                _id: 1
            }, {
                _id: 2
            }];

            httpBackend.expect('GET', '/api/events')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.events[0]._id).toEqual(responseData[0]._id);

            httpBackend.expect('DELETE', '/api/events/1')
                .respond(responseData);

            scope.$apply(function() {
                scope.delete(1);
            });

            httpBackend.flush();


        });

    });

    describe('EventAddCtrl', function() {

        var Ctrl;
        var scope;
        var location;

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            location = _$location_;
            scope = $rootScope.$new();
            Ctrl = $controller('EventAddCtrl', {
                $scope: scope
            });
        }));

        it('should save an Event', function() {
            var responseData = {
                '_id': 1
            };

            httpBackend.expect('POST', '/api/events')
                .respond(responseData);

            scope.$apply(function() {
                scope.save({
                    $valid: true
                });
            });

            httpBackend.flush();

            expect(location.path()).toBe('/event/view/1');
        });

    });

    describe('EventEditCtrl', function() {

        var Ctrl;
        var scope;
        var location;

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            location = _$location_;
            scope = $rootScope.$new();
            Ctrl = $controller('EventEditCtrl', {
                $scope: scope,
                $stateParams: {
                    id: 1
                }
            });
        }));

        it('should get an Event', function() {
            var responseData = {
                _id: 1
            };

            httpBackend.expect('GET', '/api/events/1')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.event._id).toEqual(1);

        });

        it('should save an Event', function() {
            var responseData = {
                _id: 1
            };

            httpBackend.expect('GET', '/api/events/1')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.event._id).toEqual(1);

            httpBackend.expect('PUT', '/api/events/1')
                .respond(responseData);

            scope.$apply(function() {
                scope.save({
                    $valid: true
                });
            });

            httpBackend.flush();
            expect(location.path()).toBe('/event/view/1');
        });

    });

    describe('EventViewCtrl', function() {

        var Ctrl;
        var scope;
        var location;

        beforeEach(inject(function($controller, $rootScope, _$location_) {
            location = _$location_;
            scope = $rootScope.$new();
            Ctrl = $controller('EventViewCtrl', {
                $scope: scope,
                $stateParams: {
                    id: 1
                }
            });
        }));

        it('should get an Event', function() {
            var responseData = {
                _id: 1
            };

            httpBackend.expect('GET', '/api/events/1')
                .respond(responseData);

            httpBackend.flush();

            expect(scope.event._id).toEqual(1);

        });

    });

});
