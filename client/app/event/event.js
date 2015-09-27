'use strict';

angular.module('meanVoServerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('eventList', {
                url: '/event',
                templateUrl: 'app/event/eventList.html',
                controller: 'EventCtrl'
            }).state('eventAdd', {
                url: '/event/add/:organization_id',
                templateUrl: 'app/event/eventAdd.html',
                controller: 'EventAddCtrl'
            }).state('eventEdit', {
                url: '/event/edit/:id',
                templateUrl: 'app/event/eventAdd.html',
                controller: 'EventEditCtrl'
            }).state('eventView', {
                url: '/event/view/:id',
                templateUrl: 'app/event/eventView.html',
                controller: 'EventViewCtrl'
            });
    });
