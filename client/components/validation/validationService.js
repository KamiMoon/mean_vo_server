'use strict';

angular.module('meanVoServerApp')
    .service('ValidationService', function($rootScope) {

        //used as callback for validation errors
        this.displayErrors = function(form, err) {
            err = err.data;
            $rootScope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {

                if (form[field]) {
                    //form[field].$setValidity('mongoose', false);
                    $rootScope.errors[field] = error.message;
                }

            });
        };

        this.error = function(errorText) {
            //TODO - display these better
            alert(errorText);
        };

        this.displaySuccess = function(successMessage) {
            //clear errors
            $rootScope.errors = {};

            $rootScope.successMessage = successMessage || 'Success!';

        };

    });