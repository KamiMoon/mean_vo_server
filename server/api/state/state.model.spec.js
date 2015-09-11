'use strict';

var should = require('should');
var app = require('../../app');
var State = require('./state.model');

var validState = new State({
    _id: 1,
    name: 'Nebrasksa',
    abbrev: 'NE'
});

describe('State Model', function() {
    before(function(done) {
        // Clear before testing
        State.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        State.remove().exec().then(function() {
            done();
        });
    });

    it('should save when adding a valid state', function(done) {
        validState.save(function(err) {
            should.not.exist(err);

            console.log(validState);

            done();
        });
    });

});