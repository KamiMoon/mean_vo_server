'use strict';

angular.module('meanVoServerApp')
    .controller('SignupCtrl', function($scope, Auth, $location, $window, ValidationService) {
        $scope.user = {};

        $scope.register = function(form) {
            $scope.submitted = true;

            if (form.$valid) {

                if ($scope.user.password !== $scope.user.confirmPassword) {
                    ValidationService.error('Confirmation password must match password.');
                } else {

                    Auth.createUser({
                            name: $scope.user.name,
                            email: $scope.user.email,
                            password: $scope.user.password
                        })
                        .then(function() {
                            ValidationService.displaySuccess('You have been registered. Check your email to verify.');
                            // Account created, redirect to home
                            $location.path('/thanks');
                        }, function(err) {
                            ValidationService.displayErrors(form, err);
                        });
                }
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
