'use strict';

var should = require('should');
var app = require('../../app');
var School = require('./school.model');

var validSchool = new School({
    _id: 99,
    name: 'Some School'
});

describe('School Model', function() {

    it('should save when adding a valid school', function(done) {
        validSchool.save(function(err) {
            should.not.exist(err);
            done();
        });
    });
});