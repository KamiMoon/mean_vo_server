'use strict';

angular.module('meanVoServerApp')
    .directive('membersList', function() {


        return {
            restrict: 'E',
            templateUrl: 'components/partials/membersList.html',
            link: function(scope, element, attrs) {

            }
        };
    });
