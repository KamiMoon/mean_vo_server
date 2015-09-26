'use strict';

angular.module('meanVoServerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('registration', {
        url: '/registration',
        templateUrl: 'app/registration/registration.html',
        controller: 'RegistrationCtrl'
      });
  });