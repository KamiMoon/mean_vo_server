'use strict';

angular.module('meanVoServerApp')
    .controller('EventCtrl', function($scope, EventService) {

        $scope.events = EventService.query();

    }).controller('EventAddCtrl', function($scope, $stateParams, $location, EventService, ValidationService) {

        var organization_id = $stateParams.organization_id;

        $scope.event = {
            organization_id: organization_id
        };

        $scope.save = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                EventService.save($scope.event).$promise.then(function(event) {
                    ValidationService.displaySuccess();
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
                    ValidationService.displaySuccess();
                    $location.path('/event/view/' + id);
                }, function(err) {
                    ValidationService.displayErrors(form, err);
                });
            }
        };

    }).controller('EventViewCtrl', function($scope, $stateParams, EventService) {

        var id = $stateParams.id;

        $scope.event = EventService.get({
            id: id
        });

    });
