'use strict';

angular.module('meanVoServerApp')
    .directive('bFooter', function() {
        return {
            templateUrl: 'components/bFooter/footer.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });