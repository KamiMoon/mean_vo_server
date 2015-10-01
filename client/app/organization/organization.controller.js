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
                        ValidationService.displaySuccess();

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

    }).controller('OrganizationAddCtrl', function($scope, $location, OrganizationService, ControllerUtil) {

        $scope.organization = {};

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
                //     ValidationService.displaySuccess();
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
                    url: '/api/organizations/' + id,
                    method: 'PUT',
                    file: $scope.photo,
                    data: $scope.organization
                });

                ControllerUtil.handle(request, form).then(function() {
                    $location.path('/organization/view/' + id);
                });

            }

        };

    }).controller('OrganizationViewCtrl', function($scope, $stateParams, OrganizationService) {

        var id = $stateParams.id;

        $scope.organization = OrganizationService.get({
            id: id
        });

    });
