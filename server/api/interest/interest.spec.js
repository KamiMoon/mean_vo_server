'use strict';

var should = require('should');
var app = require('../../app');
var Interest = require('./interest.model');

var validInterest = new Interest({
    _id: 99,
    name: 'Some Interest'
});

describe('Interest Model', function() {

    it('should save when adding a valid interest', function(done) {
        validInterest.save(function(err) {
            should.not.exist(err);
            done();
        });
    });
});