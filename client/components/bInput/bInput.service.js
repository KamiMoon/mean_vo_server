'use strict';

angular.module('meanVoServerApp')
    .service('InputService', function($q, $http, $localStorage) {

        this.get = function(key, url) {
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

    });
