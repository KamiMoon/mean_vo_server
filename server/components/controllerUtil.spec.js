'use strict';

var should = require('should');
var ControllerUtil = require('./controllerUtil');

describe('ControllerUtil', function() {

    describe('getQuery', function() {
        it("should retain properties with good values", function() {
            var req = {
                query: {
                    "name": "Eric"
                }
            };

            ControllerUtil.getQuery(req).should.have.property('name', 'Eric');
        });

        it("should remove properties with empty string or null values", function() {
            var req = {
                query: {
                    "name": "",
                    "age": 12,
                    "city": null
                }
            };

            var result = ControllerUtil.getQuery(req);

            console.log(result);

            result.should.not.have.property('name');
            result.should.not.have.property('city');
            result.should.have.property('age');
        });
    });


});