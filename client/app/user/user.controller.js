'use strict';

angular.module('meanVoServerApp')
    .controller('UserCtrl', function($scope, User, ValidationService) {

        $scope.users = User.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.users = User.query($scope.searchParams);

        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    User.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.displaySuccess();

                        angular.forEach($scope.users, function(obj, i) {
                            if (obj._id === id) {
                                $scope.users.splice(i, 1);
                            }
                        });

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('UserEditCtrl', function($scope, $location, User, ValidationService, Upload) {

        $scope.user = User.get();

        $scope.save = function(form) {
            $scope.submitted = true;

            if (form.$valid) {

                var request = Upload.upload({
                    url: '/api/users/' + $scope.user._id,
                    file: $scope.photo
                });

                request.success(function(data, status, headers, config) {
                    ValidationService.displaySuccess();
                    $location.path('/profile');
                }).error(function(data, status, headers, config) {
                    ValidationService.displayErrors(form, err);
                });
            }

        };

    }).controller('UserProfileCtrl', function($scope, User) {

        $scope.user = User.get();
    });
