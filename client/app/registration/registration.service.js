'use strict';

angular.module('meanVoServerApp')
    .factory('RegistrationService', function($resource) {
        return $resource('/api/registrations/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
