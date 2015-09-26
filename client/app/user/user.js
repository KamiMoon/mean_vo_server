'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'app/user/user.html',
                controller: 'UserCtrl'
            });
    });