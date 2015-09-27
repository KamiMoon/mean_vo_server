'use strict';

describe('Directive: bInput', function() {

    // load the directive's module and view
    beforeEach(module('meanVoServerApp'));

    var element;
    var scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should create a default html', inject(function($compile) {
        element = angular.element('<b-input></b-input>');
        element = $compile(element)(scope);
        scope.$apply();

        console.log(element[0].outerHTML);
        expect(element[0].outerHTML).toBe('<b-input class="ng-scope"><div class="form-group ng-scope"><label class="col-lg-2 control-label"></label><div class="col-lg-10"><input type="text" class="form-control"></div></div></b-input>');
    }));
});
