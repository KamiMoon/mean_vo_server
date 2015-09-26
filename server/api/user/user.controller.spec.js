'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var UserController = require('./user.controller');

var newUser = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'erickizaki@gmail.com',
    password: 'password'

});

describe('User Controller', function() {

    xit('should create confirmation email', function(done) {

        newUser.provider = 'local';
        newUser.role = 'user';
        newUser.save(function(err, user) {

            //create an email with the activation hash in it
            UserController.createConfirmationEmail(null, user);
        });


    });


});