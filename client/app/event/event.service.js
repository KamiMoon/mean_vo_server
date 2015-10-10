'use strict';

angular.module('meanVoServerApp')
    .factory('EventService', function($resource) {
        return $resource('/api/events/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            register: {
                method: 'PUT',
                url: 'api/events/:id/register'
            },
            unregister: {
                method: 'PUT',
                url: 'api/events/:id/unregister'
            },
            updateregistration: {
                method: 'PUT',
                url: 'api/events/:id/updateregistration'
            }
        });
    });
