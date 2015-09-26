'use strict';

var should = require('should');
var app = require('../../app');
var Category = require('./category.model');

var validCategory = new Category({
    _id: 99,
    name: 'Some Category'
});

describe('Category Model', function() {

    it('should save when adding a valid category', function(done) {
        validCategory.save(function(err) {
            should.not.exist(err);
            done();
        });
    });
});