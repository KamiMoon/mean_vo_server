'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('userList', {
                url: '/user',
                templateUrl: 'app/user/userList.html',
                controller: 'UserCtrl'
            }).state('userEdit', {
                url: '/user/edit',
                templateUrl: 'app/user/userEdit.html',
                controller: 'UserEditCtrl'
            }).state('userView', {
                url: '/profile',
                templateUrl: 'app/user/profile.html',
                controller: 'UserProfileCtrl'
            });
    });
