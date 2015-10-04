'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('interestList', {
                url: '/interest',
                templateUrl: 'app/interest/interestList.html',
                controller: 'InterestCtrl'
            }).state('interestAdd', {
                url: '/interest/add/:registration_id',
                templateUrl: 'app/interest/interestAdd.html',
                controller: 'InterestAddCtrl'
            });
    });
