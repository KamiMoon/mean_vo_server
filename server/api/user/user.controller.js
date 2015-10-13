'use strict';

var User = require('./user.model');
var Event = require('../event/event.model');

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var ControllerUtil = require('../../components/controllerUtil');


var createConfirmationEmail = function(req, user) {
    var host = ControllerUtil.getHostFromRequest(req);

    if (host) {

        var linkAddress = 'http://' + host + '/api/users/activate/' + encodeURIComponent(user._id) + '/' + encodeURIComponent(user.activationHash);

        var body = 'Welcome ' + user.name + ', <br/>You are registered for Volunteer Omaha. <br/><br/>';
        body += 'To activate your account click this link: <a href="' + linkAddress + '">Activate Account</a>';

        var mailOptions = {
            from: 'Volunteer Omaha <capstoneconsultants3@gmail.com', // sender address
            to: user.email, // list of receivers
            subject: 'Confirm Registration', // Subject line
            html: body // html body
        };

        config.transporter.sendMail(mailOptions, function(error) {
            if (error) {
                return console.log(error);
            }
        });
    }


};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword -activationHash', function(err, users) {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.save(function(err, user) {
        if (err) return ControllerUtil.validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });

        //create an email with the activation hash in it
        createConfirmationEmail(req, user);

        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    ControllerUtil.findByIdAndRemove(req, res, User);
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return ControllerUtil.validationError(res, err);
                res.status(200).send('OK');
            });
        } else {
            res.status(403).send('Forbidden');
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword -activationHash').exec(function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user);
    });
};

exports.update = function(req, res) {
    ControllerUtil.update(req, res, User, 'photo');
};

exports.activate = function(req, res) {
    var id = decodeURIComponent(req.params.id);
    var activationHash = decodeURIComponent(req.params.activationHash);

    console.log('Activate');

    //get the User
    User.findById(id, function(err, user) {
        console.log('FindById');

        if (err) {
            return ControllerUtil.handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }

        //read his activationHash
        var userActivationHash = user.activationHash;

        if (activationHash === userActivationHash) {
            //if they are the same then flag him as activated
            user.activated = true;

            user.save(function(err) {
                if (err) {
                    return ControllerUtil.handleError(res, err);
                }
                //TODO: Success flash

                //redirect to login page
                ControllerUtil.redirect(req, res, '/login');
            });


        } else {
            //Didn't match - forbidden
            res.status(403).send('Forbidden');
        }


    });
};

exports.registrations = function(req, res, next) {
    var userId = req.params.id;

    //TODO
    res.json([]);
};

exports.profile = function(req, res, next) {
    console.log('profile');

    var userId = req.params.id;

    User.findOne({
        _id: userId
    }, '-salt -hashedPassword -activationHash').lean().exec(function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');

        //get the registrations

        Event.getEventsRegisteredByUser(userId, function(err, events) {
            if (err) return next(err);

            console.log(events);

            user.events = events;

            res.json(user);
        });
    });
};

exports.leaderboard = function(req, res, next) {

    console.log('leaderboard');

    Event.getTopUsers(5, function(err, result) {
        if (err) return next(err);

        res.json(result);
    });
    //TODO
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
