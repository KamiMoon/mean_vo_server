'use strict';

angular.module('meanVoServerApp')
    .directive('registrationsList', function($http, Auth, EventService, ValidationService, $rootScope) {

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

                scope.shouldShowHourInput = function(status) {
                    return status === 'Approved';
                };

                scope.unregister = function(event, registration) {
                    var registrationId = registration._id;

                    EventService.unregister({
                        id: event._id
                    }, registration).$promise.then(function() {
                        ValidationService.success();

                        //find and remove
                        for (var i = 0; i < scope.events.length; i++) {
                            if (scope.events[i].registrations && scope.events[i].registrations._id === registrationId) {
                                scope.events.splice(i, 1);
                                break;
                            }
                        }

                        $rootScope.$broadcast('Unregistered');

                    }, function(err) {
                        ValidationService.error(err);
                    });
                };

                scope.saveHours = function(event, registration) {
                    EventService.updateregistration({
                        id: event._id
                    }, registration).$promise.then(function() {
                        ValidationService.success();
                    }, function(err) {
                        ValidationService.error(err);
                    });
                };
            }
        };
    });
