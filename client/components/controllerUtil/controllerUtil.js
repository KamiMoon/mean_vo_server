'use strict';

angular.module('meanVoServerApp')
    .service('ControllerUtil', function(Upload, ValidationService) {

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

    });
