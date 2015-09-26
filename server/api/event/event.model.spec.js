'use strict';

var should = require('should');
var app = require('../../app');
var Event = require('./event.model');

var validEvent = new Event({
    name: 'My Event',
    email: 'test@test.com',
    short_description: 'My Desc',
    interests: [1]
});

describe('Event Model', function() {
    before(function(done) {
        // Clear before testing
        Event.remove().exec().then(function() {
            done();
        });
    });

    after(function(done) {
        Event.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no events', function(done) {
        Event.find({}, function(err, events) {
            events.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate event', function(done) {
        validEvent.save(function() {
            var userDup = new Event(validEvent);
            userDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        validEvent.email = '';
        validEvent.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should fail when saving with an invalid email', function(done) {
        validEvent.email = 'eric';
        validEvent.save(function(err) {
            should.exist(err);
            done();
        });
    });

    xit('should save with a valid email', function(done) {
        validEvent.email = 'eric@gmail.com';
        validEvent.save(function(err) {
            should.not.exist(err);
            done();
        });
    });

    it('should fail when saving with an invalid phone', function(done) {
        validEvent.phone = '4029100331sf';
        validEvent.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should save when saving with an valid phone', function(done) {
        validEvent.phone = '402-910-0331';
        validEvent.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should fail when saving without a short description', function(done) {
        validEvent.description = '';
        validEvent.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should have createdAt and updatedAt properties added', function(done) {
        validEvent.save(function(err) {

            validEvent.should.have.property('createdAt');
            validEvent.should.have.property('updatedAt');

            done();
        });
    });

    it("should have interests", function(done) {
        Event.findById(validEvent._id).populate('interests').exec(function(err, returnedEvent) {
            returnedEvent.interests[0].name.should.be.exactly('Animals');
            done();
        });
    });

    it("should have a status", function(done) {
        Event.findById(validEvent._id).populate('status_id').exec(function(err, returnedEvent) {
            returnedEvent.status_id.name.should.be.exactly('Pending');
            done();
        });
    });


});