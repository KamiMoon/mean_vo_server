'use strict';

angular.module('meanVoServerApp')
    .factory('EventService', function($resource) {
        return $resource('/api/events/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
