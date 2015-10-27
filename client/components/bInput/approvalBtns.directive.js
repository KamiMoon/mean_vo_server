'use strict';

angular.module('meanVoServerApp')
    .directive('updateStatus', function($http, ValidationService) {


        return {
            restrict: 'E',
            scope: {
                label: "@",
                updateId: "@",
                status: "@",
                //Role, Organization, Event, Registration, Hour
                modelObj: "@",
                //required for role updates
                userId: "@",
                //required for Registration update
                eventId: "@"
            },
            template: '<button ng-if="status === \'Pending\' || status === \'Dissaproved\'" class="btn btn-success" ng-click="updateStatus(\'Approved\')">Approve {{label}}</button>' +
                '<button ng-if="status === \'Approved\'" class="btn btn-danger" ng-click="updateStatus(\'Dissaproved\')">Dissaprove {{label}}</button>',
            link: function(scope, element, attrs) {

                scope.label = scope.label || scope.modelObj;

                scope.updateStatus = function(status) {

                    var updateObj = {
                        id: scope.updateId,
                        status: status,
                        modelObj: scope.modelObj,
                        userId: scope.userId,
                        eventId: scope.eventId
                    };

                    $http.put('api/status/update', updateObj).then(function() {
                        ValidationService.success('Updated Status Successfully');
                        scope.status = status;
                    }, function() {
                        ValidationService.error('Error updating status');
                    });

                };
            }
        };
    });
