'use strict';

angular.module('meanVoServerApp')
    .controller('RegistrationCtrl', function($scope, RegistrationService, ValidationService) {

        $scope.registrations = RegistrationService.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.registrations = RegistrationService.query($scope.searchParams);

        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    RegistrationService.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.displaySuccess();

                        angular.forEach($scope.registrations, function(org, i) {
                            if (org._id === id) {
                                $scope.Registrations.splice(i, 1);
                            }
                        });

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('RegistrationAddCtrl', function($scope, $location, $stateParams, RegistrationService, ControllerUtil, Auth) {

        var user = Auth.getCurrentUser();

        var event_id = $stateParams.event_id;

        $scope.registration = {
            event_id: event_id,
            user_id: user._id
        };

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                ControllerUtil.handle(RegistrationService.save($scope.registration).$promise, form).then(function(registration) {
                    $location.path('/registration/view/' + registration._id);
                });
            }

        };

    }).controller('RegistrationEditCtrl', function($scope, $stateParams, $location, RegistrationService, ControllerUtil) {

        var id = $stateParams.id;

        $scope.registration = RegistrationService.get({
            id: id
        });

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                ControllerUtil.handle(RegistrationService.save($scope.registration).$promise, form).then(function(registration) {
                    $location.path('/registration/view/' + registration._id);
                });

            }

        };

    }).controller('RegistrationViewCtrl', function($scope, $stateParams, RegistrationService) {

        var id = $stateParams.id;

        RegistrationService.get({
            id: id
        }).$promise.then(function(registration) {
            $scope.registration = registration;
            //convenience
            $scope.event = registration.event_id;
        });


    });
