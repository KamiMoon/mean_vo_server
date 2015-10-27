'use strict';

angular.module('meanVoServerApp')
    .directive('registrationsList', function($http, Auth) {

        return {
            restrict: 'E',
            scope: {
                organizationId: '@'
            },
            templateUrl: 'components/partials/registrationsList.html',
            link: function(scope, element, attrs) {

                //wait till the value is populated to call
                var unregister = scope.$watch('organizationId', function() {
                    if (scope.organizationId) {
                        $http.get('/api/organizations/' + scope.organizationId + '/registrationsForOrganization').then(function(results) {
                            scope.events = results.data;
                        });

                        unregister();
                    }
                });

                //if they are Member, primary and secondary can approve. if the user is a secondary org admin, only primary org admin can approve 
                //scope.canUpdate = function(userRole, organizationId) {
                //    return (userRole === 'Member' && Auth.isOrgAdminFor(organizationId)) || (userRole === 'Organization Admin Secondary' && Auth.isOrgAdminFor(organizationId, true));
                //};

                scope.canUpdate = function(userId, organizationId) {
                    return Auth.isMine(userId) || Auth.isOrgAdminFor(organizationId);
                };
            }
        };
    });
