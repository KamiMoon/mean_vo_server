'use strict';

angular.module('meanVoServerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('organization', {
        url: '/organization',
        templateUrl: 'app/organization/organization.html',
        controller: 'OrganizationCtrl'
      });
  });