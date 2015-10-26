'use strict';

angular.module('meanVoServerApp')
    .directive('eventsList', function($http) {

        return {
            restrict: 'E',
            scope: {
                organizationId: '@'
            },
            templateUrl: 'components/partials/eventsList.html',
            link: function(scope, element, attrs) {

                //wait till the value is populated to call
                var unregister = scope.$watch('organizationId', function() {
                    if (scope.organizationId) {
                        $http.get('/api/organizations/' + scope.organizationId + '/eventTotalsForOrganization').then(function(results) {
                            scope.events = results.data;
                        });

                        unregister();
                    }
                });

            }
        };
    });
