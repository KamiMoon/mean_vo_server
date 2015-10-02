'use strict';

angular.module('meanVoServerApp')
    .service('InputService', function($q, $http, $localStorage) {

        this.getStates = function() {
            var states = $localStorage.states;
            var deferred = $q.defer();

            if (states) {
                deferred.resolve(states);
            } else {
                var request = $http.get('/api/states');
                request.success(function(states) {
                    $localStorage.states = states;
                    deferred.resolve(states);
                });
            }

            return deferred.promise;
        };


    });
