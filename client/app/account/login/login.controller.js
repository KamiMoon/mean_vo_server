'use strict';

angular.module('meanVoServerApp')
    .controller('LoginCtrl', function($scope, Auth, $location, $window, ValidationService) {
        $scope.user = {};

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function() {
                        ValidationService.success('Logged In');
                        // Logged in, redirect to home
                        //var user = Auth.getCurrentUser();

                        $location.path('/profile/');
                    })
                    .catch(function(err) {
                        ValidationService.error(err.message);
                    });
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
