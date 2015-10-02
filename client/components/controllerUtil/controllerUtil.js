'use strict';

angular.module('meanVoServerApp')
    .service('ControllerUtil', function(Upload, ValidationService, $q, $http, $localStorage) {

        this.upload = function(uploadObj) {
            return Upload.upload(uploadObj);
        };

        this.handle = function(promise, form, successMessage) {
            promise.then(function() {
                ValidationService.displaySuccess(successMessage);
            }, function(err) {
                ValidationService.displayErrors(form, err);
            });

            return promise;
        };

        this.validate = function($scope, form) {
            $scope.submitted = true;

            return form.$valid;
        };

        this.getStates = function() {
            var states = $localStorage.states;
            var deferred = $q.defer();

            console.log(states);

            if (states) {
                console.log('using localstorage');
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
