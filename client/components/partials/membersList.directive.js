'use strict';

angular.module('meanVoServerApp')
    .directive('membersList', function($http, $timeout) {

        return {
            restrict: 'E',
            scope: {
                organizationId: '@'
            },
            templateUrl: 'components/partials/membersList.html',
            link: function(scope, element, attrs) {

                //wait till the value is populated to call
                var unregister = scope.$watch('organizationId', function() {
                    if (scope.organizationId) {
                        $http.get('/api/organizations/' + scope.organizationId + '/members').then(function(results) {
                            scope.users = results.data;
                        });

                        unregister();
                    }
                });

            }
        };
    });
