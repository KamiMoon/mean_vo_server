'use strict';

var should = require('should');
var app = require('../../app');
var Role = require('./role.model');

var validRole = new Role({
    _id: 99,
    name: 'Some Role'
});

describe('Role Model', function() {

    it('should save when adding a valid role', function(done) {
        validRole.save(function(err) {
            should.not.exist(err);
            done();
        });
    });
});