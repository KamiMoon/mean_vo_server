'use strict';

describe('Directive: bInput', function() {

    // load the directive's module and view
    beforeEach(module('meanVoServerApp'));

    var element;
    var scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function($compile) {
        element = angular.element('<b-input></b-input>');
        element = $compile(element)(scope);
        scope.$apply();
        expect(element.text()).toBe('this is the bInput directive');
    }));
});