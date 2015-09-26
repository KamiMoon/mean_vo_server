'use strict';

angular.module('meanVoServerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event', {
        url: '/event',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      });
  });