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
                        ValidationService.success();

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

    }).controller('UserEditCtrl', function($scope, $location, User, ControllerUtil) {

        $scope.user = User.get();

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                var request = ControllerUtil.upload({
                    url: '/api/users/' + $scope.user._id,
                    file: $scope.photo,
                    data: $scope.user
                });

                ControllerUtil.handle(request, form).then(function() {
                    $location.path('/profile/' + $scope.user._id);
                });
            }

        };

    }).controller('UserProfileCtrl', function($scope, $stateParams, User) {
        var id = $stateParams.id;

        if (!id) {
            $scope.user = User.get();
        } else {
            $scope.user = User.profile({
                id: id
            });
        }


    });
