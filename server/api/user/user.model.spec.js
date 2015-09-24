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
    email: 'test@test.com',
    password: 'password',
    username: 'EricKiza87',
    last_name: 'Kizaki',
    first_name: 'Eric'

});

describe('User Model', function() {
    before(function(done) {



        // Clear users before testing
        User.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        User.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no users', function(done) {
        User.find({}, function(err, users) {
            users.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate user', function(done) {
        user.save(function() {
            var userDup = new User(user);
            userDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        user.email = '';
        user.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should save when saving with a valid user', function(done) {

        var user2 = new User({
            name: 'Fake User',
            email: 'erickizaki2@gmail.com',
            password: 'password',
            username: 'EricKiza87',
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
            username: 'EricKiza87',
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
            username: 'EricKiza87',
            last_name: 'Kizaki',
            first_name: 'Eric',
            state_id: 85
        };

        User.create(user3, function(err, resultingUser) {

            var interest = new Interest({
                user_id: resultingUser._id
            });

            interest.save(function(err, returnedInterest) {

                User.findById(resultingUser._id, function(err, returnedUser2) {

                    returnedUser2.interests.indexOf(returnedInterest._id).should.not.be.exactly(-1);

                    done();

                });

            });
        })
    });

    it("should have registrations", function(done) {
        var user3 = {
            name: 'Fake User',
            email: 'test1234477@test.com',
            password: 'password',
            username: 'EricKiza87',
            last_name: 'Kizaki',
            first_name: 'Eric',
            state_id: 85
        };

        User.create(user3, function(err, resultingUser) {

            var registration = new Registration({
                user_id: resultingUser._id
            });

            registration.save(function(err, returnedReg) {

                User.findById(resultingUser._id, function(err, returnedUser2) {

                    returnedUser2.registrations.indexOf(returnedReg._id).should.not.be.exactly(-1);

                    done();

                });

            });
        })

    });



});