'use strict';

angular.module('meanVoServerApp')
    .factory('InterestService', function($resource) {
        return $resource('/api/interests/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
