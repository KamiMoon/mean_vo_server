'use strict';

angular.module('meanVoServerApp')
    .controller('OrganizationCtrl', function($scope, OrganizationService, ValidationService) {

        $scope.organizations = OrganizationService.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.organizations = OrganizationService.query($scope.searchParams);

        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    OrganizationService.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.success();

                        angular.forEach($scope.organizations, function(org, i) {
                            if (org._id === id) {
                                $scope.organizations.splice(i, 1);
                            }
                        });

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('OrganizationAddCtrl', function($scope, $location, OrganizationService, ControllerUtil, Auth) {

        var user = Auth.getCurrentUser();

        $scope.organization = {
            user_id: user._id
        };

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                var request = ControllerUtil.upload({
                    url: '/api/organizations/',
                    method: 'POST',
                    file: $scope.photo,
                    data: $scope.organization
                });

                ControllerUtil.handle(request, form).then(function(data) {

                    $location.path('/organization/view/' + data.data._id);
                });


                // OrganizationService.save($scope.organization).$promise.then(function(organization) {
                //     ValidationService.success();
                //     $location.path('/organization/view/' + organization._id);
                // }, function(err) {
                //     ValidationService.displayErrors(form, err);
                // });

            }

        };

    }).controller('OrganizationEditCtrl', function($scope, $stateParams, $location, OrganizationService, ControllerUtil) {

        var id = $stateParams.id;

        $scope.organization = OrganizationService.get({
            id: id
        });

        $scope.save = function(form) {

            if (ControllerUtil.validate($scope, form)) {

                var request = ControllerUtil.upload({
                    url: '/api/organizations/update/' + id,
                    method: 'PUT',
                    file: $scope.photo,
                    data: $scope.organization
                });

                ControllerUtil.handle(request, form).then(function() {
                    $location.path('/organization/view/' + id);
                });

            }

        };

    }).controller('OrganizationViewCtrl', function($scope, $location, $stateParams, Auth, OrganizationService, ValidationService) {

        var id = $stateParams.id;
        var user = Auth.getCurrentUser();

        $scope.organization = OrganizationService.get({
            id: id
        });

        $scope.join = function() {

            if (user._id) {
                OrganizationService.join({
                    id: id,
                    user_id: user._id,
                    organization_name: $scope.organization.name
                }).$promise.then(function() {
                    ValidationService.success('Joined.');
                    Auth.refreshUser();
                });
            } else {
                ValidationService.error('Not logged in.');
                $location.path('/login');
            }

        };

        $scope.leave = function() {

            if (user._id) {
                OrganizationService.leave({
                    id: id,
                    user_id: user._id
                }).$promise.then(function() {
                    ValidationService.success('Left.');
                    Auth.refreshUser();
                });
            } else {
                ValidationService.error('Not logged in.');
                $location.path('/login');
            }

        };

    }).controller('OrganizationAdminCtrl', function($scope, $stateParams, OrganizationService) {

        var id = $stateParams.id;

        $scope.organization = OrganizationService.get({
            id: id
        });

    });
