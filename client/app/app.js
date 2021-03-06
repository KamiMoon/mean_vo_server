'use strict';

angular.module('meanVoServerApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.mask',
        'ngTouch',
        'ngFileUpload',
        'ngStorage'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, Auth) {
    $rootScope.Auth = Auth;

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next, toParams, fromState, fromParams) {
        Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate || next.roles && !loggedIn) {
                event.preventDefault();
                return $location.path('/login');
            }

            if (next.roles && !Auth.hasRoles(next.roles)) {
                event.preventDefault();
                return $location.path('/notAuthorized').replace();
            }

            if (next.isOrgAdminFor && toParams[next.isOrgAdminFor] && !Auth.isOrgAdminFor(toParams[next.isOrgAdminFor])) {
                event.preventDefault();
                return $location.path('/notAuthorized').replace();
            }

        });
    });
});
