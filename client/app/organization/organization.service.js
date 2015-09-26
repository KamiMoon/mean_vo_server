'use strict';

angular.module('meanVoServerApp')
    .factory('OrganizationService', function($resource) {
        return $resource('/api/organizations/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });