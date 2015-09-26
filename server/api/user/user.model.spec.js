'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var State = require('../state/state.model');
var Registration = require('../registration/registration.model');
var Interest = require('../interest/interest.model');

var user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test34@test.com',
    password: 'password',

});

describe('User Model', function() {

    it('should fail when saving without an email', function(done) {
        user.email = '';
        user.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should save when saving with a valid user', function(done) {

        var user2 = new User({
            name: 'Fake Usefr',
            email: 'erickizakdi2@gmail.com',
            password: 'password',
            username: 'EricKiza800000f7',
            last_name: 'Kizaki',
            first_name: 'Eric'

        });

        user2.save(function(err, returnedUser) {
            should.not.exist(err);
            should.exist(returnedUser._id);

            done();
        });
    });

    it("should authenticate user if password is valid", function() {
        return user.authenticate('password').should.be.true;
    });

    it("should not authenticate user if password is invalid", function() {
        return user.authenticate('blah').should.not.be.true;
    });

    it("should have an activation hash", function() {

        //console.log(user.activationHash);
        return user.should.have.property('activationHash');
    });

    it("should have be able to get the hash and then use it", function() {
        var hash = user.activationHash;
        var useable = user.activationHash === hash;

        return useable.should.be.true;
    });

    it("should be activated false by default to start", function() {
        return user.activated.should.be.false;
    });

    it("should have a state by id and populate the state", function(done) {
        var user3 = {
            name: 'Fake User',
            email: 'test12344@test.com',
            password: 'password',
            username: 'EricKizadddddddd87',
            last_name: 'Kizaki',
            first_name: 'Eric',
            state_id: 85
        };

        User.create(user3, function(err, returnedUser) {
            returnedUser.state_id.should.be.exactly(85);

            User.findById(returnedUser._id).populate('state_id').exec(function(err, retrievedUser) {

                retrievedUser.state_id.name.should.be.exactly('Kansas');

                done();

            });

        });


    });

    it("should have interests", function(done) {
        var user3 = {
            name: 'Fake User',
            email: 'test123744@test.com',
            password: 'password',
            username: 'EricsssssssKiza87',
            last_name: 'Kizaki',
            first_name: 'Eric',
            state_id: 85,
            interests: [1, 2]
        };

        User.create(user3, function(err, resultingUser) {
            User.findById(resultingUser._id).populate('interests').exec(function(err, returnedUser2) {
                returnedUser2.interests[0].name.should.be.exactly('Animals');
                done();
            });
        })
    });

    it("should have registrations", function(done) {

        User.findOne({
            'email': 'test@test.com'
        }, {}, function(err, resultingUser) {
            var registration = new Registration({
                user_id: resultingUser._id
            });

            registration.save(function(err, returnedReg) {

                User.findById(resultingUser._id, function(err, returnedUser2) {
                    returnedUser2.registrations.indexOf(returnedReg._id).should.not.be.exactly(-1);

                    done();

                });

            });
        });

    });



});