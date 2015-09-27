'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            }).state('about', {
                url: '/about',
                templateUrl: 'app/main/about.html'
            }).state('contact', {
                url: '/contact',
                templateUrl: 'app/main/contact.html'
            }).state('faq', {
                url: '/faq',
                templateUrl: 'app/main/faq.html'
            }).state('thanks', {
                url: '/thanks',
                templateUrl: 'app/main/thanks.html'
            });
    });
