'use strict';

var should = require('should');
var app = require('../../app');
var State = require('./state.model');

var validState = new State({
    _id: 1,
    name: 'Nebrasdasksa',
    abbrev: 'NEzx'
});

describe('State Model', function() {

    it('should save when adding a valid state', function(done) {
        validState.save(function(err) {
            should.not.exist(err);

            //console.log(validState);

            done();
        });
    });

});