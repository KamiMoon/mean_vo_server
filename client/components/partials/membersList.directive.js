'use strict';

angular.module('meanVoServerApp')
    .directive('membersList', function($http) {

        return {
            restrict: 'E',
            scope: {
                organizationId: '@'
            },
            templateUrl: 'components/partials/membersList.html',
            link: function(scope, element, attrs) {

                $http.get('/api/organizations/members/' + scope.organizationId, function(results) {
                    scope.users = results;
                });

            }
        };
    });
