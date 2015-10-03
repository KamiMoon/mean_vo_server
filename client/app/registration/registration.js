'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('registrationList', {
                url: '/registration',
                templateUrl: 'app/registration/registrationList.html',
                controller: 'RegistrationCtrl'
            }).state('registrationAdd', {
                url: '/registration/add/:event_id',
                templateUrl: 'app/registration/registrationAdd.html',
                controller: 'RegistrationAddCtrl'
            }).state('registrationEdit', {
                url: '/registration/edit/:id',
                templateUrl: 'app/registration/registrationAdd.html',
                controller: 'RegistrationEditCtrl'
            }).state('registrationView', {
                url: '/registration/view/:id',
                templateUrl: 'app/registration/registrationView.html',
                controller: 'RegistrationViewCtrl'
            });
    });
