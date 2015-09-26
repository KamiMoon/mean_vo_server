'use strict';

angular.module('meanVoServerApp')
    .directive('navbar', function($location, Auth) {

        return {
            templateUrl: 'components/navbar/navbar.html',
            restrict: 'E',
            scope: {},
            link: function(scope, element, attrs) {
                scope.menu = [{
                    'title': 'Home',
                    'link': '/'
                }];

                scope.isCollapsed = true;
                scope.isLoggedIn = Auth.isLoggedIn;
                scope.isAdmin = Auth.isAdmin;
                scope.getCurrentUser = Auth.getCurrentUser;

                scope.logout = function() {
                    Auth.logout();
                    $location.path('/login');
                };

                scope.isActive = function(route) {
                    return route === $location.path();
                };
            }
        };
    });