'use strict';

angular.module('meanVoServerApp')
    .factory('HourService', function($resource) {
        return $resource('/api/hours/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
