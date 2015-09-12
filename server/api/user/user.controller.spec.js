'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var UserController = require('./user.controller');

var newUser = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'erickizaki@gmail.com',
    password: 'password',
    username: 'EricKiza87',
    last_name: 'Kizaki',
    first_name: 'Eric'

});

describe('User Controller', function() {
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

    xit('should create confirmation email', function(done) {

        newUser.provider = 'local';
        newUser.role = 'user';
        newUser.save(function(err, user) {

            //create an email with the activation hash in it
            UserController.createConfirmationEmail(null, user);
        });


    });


});