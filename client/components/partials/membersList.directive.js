'use strict';

angular.module('meanVoServerApp')
    .directive('membersList', function($http, Auth) {

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

                //if they are Member, primary and secondary can approve. if the user is a secondary org admin, only primary org admin can approve 
                scope.canUpdate = function(userRole, organizationId) {
                    return (userRole === 'Member' && Auth.isOrgAdminFor(organizationId)) || (userRole === 'Organization Admin Secondary' && Auth.isOrgAdminFor(organizationId, true));
                };
            }
        };
    });
