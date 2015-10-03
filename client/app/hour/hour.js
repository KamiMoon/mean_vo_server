'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('hourList', {
                url: '/hour',
                templateUrl: 'app/hour/hourList.html',
                controller: 'HourCtrl'
            }).state('hourAdd', {
                url: '/hour/add/:registration_id',
                templateUrl: 'app/hour/hourAdd.html',
                controller: 'HourAddCtrl'
            }).state('hourEdit', {
                url: '/hour/edit/:id',
                templateUrl: 'app/hour/hourAdd.html',
                controller: 'HourEditCtrl'
            }).state('hourView', {
                url: '/hour/view/:id',
                templateUrl: 'app/hour/hourView.html',
                controller: 'HourViewCtrl'
            });
    });
