'use strict';

var should = require('should');
var app = require('../../app');
var Status = require('./status.model');

var validStatus = new Status({
    _id: 99,
    name: 'Some Status'
});

describe('Status Model', function() {

    it('should save when adding a valid status', function(done) {
        validStatus.save(function(err) {
            should.not.exist(err);
            done();
        });
    });

});