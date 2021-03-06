'use strict';

angular.module('meanVoServerApp')
    .controller('EventCtrl', function($scope, EventService, ValidationService) {

        $scope.events = EventService.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.events = EventService.query($scope.searchParams);

        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    EventService.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.success();

                        angular.forEach($scope.events, function(obj, i) {
                            if (obj._id === id) {
                                $scope.events.splice(i, 1);
                            }
                        });

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('EventAddCtrl', function($scope, $stateParams, $location, EventService, ValidationService) {

        var organization_id = $stateParams.organization_id;

        $scope.event = {
            organization_id: organization_id
        };

        $scope.save = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                EventService.save($scope.event).$promise.then(function(event) {
                    ValidationService.success();
                    $location.path('/event/view/' + event._id);
                }, function(err) {
                    ValidationService.displayErrors(form, err);
                });
            }

        };

    }).controller('EventEditCtrl', function($scope, $stateParams, $location, EventService, ValidationService) {

        var id = $stateParams.id;

        $scope.event = EventService.get({
            id: id
        });

        $scope.save = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                EventService.update({
                    id: $scope.event._id
                }, $scope.event).$promise.then(function() {
                    ValidationService.success();
                    $location.path('/event/view/' + id);
                }, function(err) {
                    ValidationService.displayErrors(form, err);
                });
            }
        };

    }).controller('EventViewCtrl', function($scope, $stateParams, Auth, EventService, ValidationService) {

        var id = $stateParams.id;
        var user = Auth.getCurrentUser();
        $scope.user = user;

        //either show the current registration or a form for new registration
        $scope.currentRegistration = null;
        $scope.registration = null;

        var setupRegistration = function() {
            $scope.currentRegistration = null;
            $scope.registration = {
                user_id: user._id,
                user_name: user.name,
                comment: ''
            };
        };

        EventService.get({
            id: id
        }).$promise.then(function(event) {
            $scope.event = event;

            if (user && user._id) {
                for (var i = 0; i < $scope.event.registrations.length; i++) {
                    if ($scope.event.registrations[i].user_id === user._id) {
                        $scope.currentRegistration = $scope.event.registrations[i];
                        break;
                    }
                }
            }

            if (!$scope.currentRegistration) {
                setupRegistration();
            }

        });

        $scope.register = function(form) {

            console.log('register');
            $scope.submitted = true;

            if (form.$valid) {

                if (!$scope.registration.user_id) {
                    alert('No user id');
                    return;
                }

                EventService.register({
                    id: $scope.event._id
                }, $scope.registration).$promise.then(function() {
                    ValidationService.success();

                    $scope.currentRegistration = angular.copy($scope.registration);
                    $scope.registration = null;

                }, function(err) {
                    ValidationService.displayErrors(form, err);
                });
            }
        };

        $scope.unregister = function() {
            console.log('unregister');

            EventService.unregister({
                id: $scope.event._id
            }, $scope.currentRegistration).$promise.then(function() {
                ValidationService.success();

                setupRegistration();
            }, function(err) {
                ValidationService.displayErrors(form, err);
            });
        };

        //saveCurrentRegistration

        $scope.saveCurrentRegistration = function(form) {

            console.log('saveCurrentRegistration');

            EventService.updateregistration({
                id: $scope.event._id
            }, $scope.currentRegistration).$promise.then(function() {
                ValidationService.success();
            }, function(err) {
                ValidationService.displayErrors(form, err);
            });
        };

    });
