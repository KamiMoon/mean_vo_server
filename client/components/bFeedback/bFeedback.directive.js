'use strict';

angular.module('meanVoServerApp')
    .directive('bFeedback', function() {
        return {
            scope: false,
            replace: true,
            template: '<div ng-if="bFeedbackMessage && bFeedbackMessage.length > 0" ' +
                'class="alert alert-{{bFeedbackMessageClass}} alert-dismissible" role="alert">{{bFeedbackMessage}}' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span></button></div>',
            restrict: 'E' //,
                //link: function postLink(scope, element, attrs) {}
        };
    });
