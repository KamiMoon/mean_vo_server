'use strict';

var should = require('should');
var ControllerUtil = require('./controllerUtil');

var clientHost = 'localhost:9000';
var serverHost = 'localhost:9090';

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

    it('should get host from request and return port for local development', function() {
        var mockRequest = {
            headers: {
                host: clientHost
            }

        }

        var host = ControllerUtil.getHostFromRequest(mockRequest);

        should(host).be.exactly(serverHost);
    });

    it('should get host from request and return port for client', function() {
        var mockRequest = {
            headers: {
                host: clientHost
            }

        }

        var host = ControllerUtil.getHostFromRequest(mockRequest, true);

        should(host).be.exactly(clientHost);
    });

    it('should redirect to a client url', function() {
        var mockRequest = {
            headers: {
                host: clientHost
            }

        }

        var mockResponse = {
            redirectResult: '',
            redirect: function(url) {
                this.redirectResult = url;
            }
        };

        ControllerUtil.redirect(mockRequest, mockResponse, '/login', true);

        should(mockResponse.redirectResult).be.exactly('http://' + clientHost + '/#/login');
    });

});