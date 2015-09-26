'use strict';

angular.module('meanVoServerApp')
  .directive('bInput', function () {
    return {
      templateUrl: 'components/bInput/bInput.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });