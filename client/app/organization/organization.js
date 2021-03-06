'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('organizationList', {
                url: '/organization',
                templateUrl: 'app/organization/organizationList.html',
                controller: 'OrganizationCtrl'
            }).state('organizationAdd', {
                url: '/organization/add',
                templateUrl: 'app/organization/organizationAdd.html',
                controller: 'OrganizationAddCtrl'
            }).state('organizationEdit', {
                url: '/organization/edit/:id',
                templateUrl: 'app/organization/organizationAdd.html',
                controller: 'OrganizationEditCtrl',
                isOrgAdminFor: 'id'
            }).state('organizationView', {
                url: '/organization/view/:id',
                templateUrl: 'app/organization/organizationView.html',
                controller: 'OrganizationViewCtrl'
            }).state('organizationAdmin', {
                url: '/organization/admin/:id',
                templateUrl: 'app/organization/organizationAdmin.html',
                controller: 'OrganizationAdminCtrl',
                isOrgAdminFor: 'id'
            });

    });
