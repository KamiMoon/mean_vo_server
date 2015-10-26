'use strict';

angular.module('meanVoServerApp')
    .directive('updateStatus', function($http, ValidationService) {


        return {
            restrict: 'E',
            scope: {
                updateId: "@",
                status: "@",
                modelObj: "@"
            },
            template: '<button ng-if="status === \'Pending\' || status === \'Dissaproved\'" class="btn btn-success" ng-click="updateStatus(\'Approved\')">Approve</button>' +
                '<button ng-if="status === \'Approved\'" class="btn btn-danger" ng-click="updateStatus(\'Dissaproved\')">Dissaprove</button>',
            link: function(scope, element, attrs) {

                scope.updateStatus = function(status) {

                    var updateObj = {
                        id: scope.updateId,
                        status: status,
                        modelObj: scope.modelObj
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
