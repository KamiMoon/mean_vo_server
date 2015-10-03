'use strict';

angular.module('meanVoServerApp')
    .service('InputService', function($q, $http, $localStorage) {

        var get = function(key, url) {
            var objs = $localStorage[key];
            var deferred = $q.defer();

            if (objs) {
                deferred.resolve(objs);
            } else {
                var request = $http.get(url);
                request.success(function(serverObjs) {
                    $localStorage[key] = serverObjs;
                    deferred.resolve(serverObjs);
                });
            }

            return deferred.promise;
        };

        this.getStates = function() {
            return get('states', '/api/states');
        };

        this.getCategories = function() {
            return get('categories', 'api/categories');
        };


    });
