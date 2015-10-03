'use strict';

angular.module('meanVoServerApp')
    .controller('HourCtrl', function($scope, HourService, ValidationService) {

        $scope.hours = HourService.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.hours = HourService.query($scope.searchParams);

        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    HourService.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.displaySuccess();

                        angular.forEach($scope.hours, function(org, i) {
                            if (org._id === id) {
                                $scope.hours.splice(i, 1);
                            }
                        });

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('HourAddCtrl', function($scope, $location, $stateParams, HourService, ControllerUtil, Auth) {

        var user = Auth.getCurrentUser();

        var registration_id = $stateParams.registration_id;

        $scope.hour = {
            registration_id: registration_id,
            user_id: user._id
        };

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                ControllerUtil.handle(HourService.save($scope.hour).$promise, form).then(function(hour) {
                    $location.path('/hour/view/' + hour._id);
                });
            }

        };

    }).controller('HourEditCtrl', function($scope, $stateParams, $location, HourService, ControllerUtil) {

        var id = $stateParams.id;

        $scope.hour = HourService.get({
            id: id
        });

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                ControllerUtil.handle(HourService.save($scope.hour).$promise, form).then(function(hour) {
                    $location.path('/hour/view/' + hour._id);
                });

            }

        };

    }).controller('HourViewCtrl', function($scope, $stateParams, HourService) {

        var id = $stateParams.id;

        HourService.get({
            id: id
        }).$promise.then(function(hour) {
            $scope.hour = hour;
        });


    });
