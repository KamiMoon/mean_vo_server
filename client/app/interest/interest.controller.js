'use strict';

angular.module('meanVoServerApp')
    .controller('InterestCtrl', function($scope, InterestService, ValidationService) {

        $scope.interests = InterestService.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.interests = InterestService.query($scope.searchParams);

        };

        var defaultNewInterest = {
            name: ''
        };

        $scope.newInterest = angular.copy(defaultNewInterest);

        $scope.add = function() {


            InterestService.save($scope.newInterest).$promise.then(function(createdInterest) {
                //add to UI
                //resset newInerests
                $scope.interests.push(createdInterest);
                $scope.newInerests = angular.copy(defaultNewInterest);


            });
        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    InterestService.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.displaySuccess();

                        angular.forEach($scope.interests, function(org, i) {
                            if (org._id === id) {
                                $scope.interests.splice(i, 1);
                            }
                        });

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('InterestAddCtrl', function($scope, $location, $stateParams, InterestService, ControllerUtil, Auth) {

        var user = Auth.getCurrentUser();

        var registration_id = $stateParams.registration_id;

        $scope.hour = {
            registration_id: registration_id,
            user_id: user._id
        };

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                ControllerUtil.handle(InterestService.save($scope.hour).$promise, form).then(function(hour) {
                    $location.path('/hour/view/' + hour._id);
                });
            }

        };

    }).controller('InterestEditCtrl', function($scope, $stateParams, $location, InterestService, ControllerUtil) {

        var id = $stateParams.id;

        $scope.hour = InterestService.get({
            id: id
        });

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                ControllerUtil.handle(InterestService.save($scope.hour).$promise, form).then(function(hour) {
                    $location.path('/hour/view/' + hour._id);
                });

            }

        };

    }).controller('InterestViewCtrl', function($scope, $stateParams, InterestService) {

        var id = $stateParams.id;

        InterestService.get({
            id: id
        }).$promise.then(function(hour) {
            $scope.hour = hour;
        });


    });
