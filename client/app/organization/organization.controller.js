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

                        $scope.organizations = OrganizationService.query($scope.searchParams);

                    }, function() {
                        alert('Delete Failed');
                    });
                }

            }
        };

    }).controller('OrganizationAddCtrl', function($scope, $location, OrganizationService, ValidationService) {

        $scope.organization = {};

        $scope.save = function(form) {
            $scope.submitted = true;

            if (form.$valid) {

                OrganizationService.save($scope.organization).$promise.then(function(organization) {
                    ValidationService.displaySuccess();
                    $location.path('/organization/view/' + organization._id);
                }, function(err) {
                    ValidationService.displayErrors(form, err);
                });

            }

        };

    }).controller('OrganizationEditCtrl', function($scope, $stateParams, $location, OrganizationService, ValidationService) {

        var id = $stateParams.id;

        $scope.organization = OrganizationService.get({
            id: id
        });

        $scope.save = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                OrganizationService.update({
                    id: $scope.organization._id
                }, $scope.organization).$promise.then(function(organization) {
                    ValidationService.displaySuccess();
                    $location.path('/organization/view/' + organization._id);
                });
            }

        };

    }).controller('OrganizationViewCtrl', function($scope, $stateParams, OrganizationService) {

        var id = $stateParams.id;

        $scope.organization = OrganizationService.get({
            id: id
        });

    });
