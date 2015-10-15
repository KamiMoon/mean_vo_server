'use strict';

angular.module('meanVoServerApp')
    .service('ValidationService', function($rootScope, $timeout) {

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

        var displayBootsrapFeedback = function(text, clasz) {
            $rootScope.errors = {};

            $rootScope.bFeedbackMessageClass = clasz;
            $rootScope.bFeedbackMessage = text;

            $timeout(function() {
                $rootScope.bFeedbackMessage = '';
            }, 5000);
        };

        this.info = function(text) {
            displayBootsrapFeedback(text || 'Info:', 'info');
        };

        this.warn = function(text) {
            displayBootsrapFeedback(text || 'Warning:', 'warning');
        };

        this.error = function(text) {
            displayBootsrapFeedback(text || 'Error!', 'danger');
        };

        this.success = function(text) {
            displayBootsrapFeedback(text || 'Success!', 'success');
        };

    });
