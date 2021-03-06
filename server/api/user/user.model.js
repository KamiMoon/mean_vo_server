'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');
var MemberSchema = require('../member/member.model');


var UserSchema = new Schema({
    interests: [String],
    roles: [MemberSchema],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: 'An email is required',
        validate: [
                validate({
                    validator: 'isEmail'
                })
            ]
            /*, TODO - for real this is unique - only turned off for testing purposes
                    unique: true*/
    },
    //TODO - needs to be 6-10 characters long
    hashedPassword: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    github: {},
    activationHash: String,

    /*first_name: {
        type: String,
        required: 'A first name is required'
    },
    last_name: {
        type: String,
        required: 'A last name is required'
    },
    username: {
        type: String,
        required: 'A user name is required',
        unique: true
    },*/
    phone: {
        type: String,
        validate: [
            validate({
                validator: 'isMobilePhone',
                arguments: 'en-US'
            })
        ]
    },
    address: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 50]
            })
        ]
    },
    city: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 50]
            })
        ]
    },
    state: {
        type: String
    },
    zip: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 16]
            })
        ]
    },
    activated: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String
    }
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);

        //also store an activation hash
        this.activationHash = this.encryptPassword(new Date().getTime().toString());
    })
    .get(function() {
        return this._password;
    });

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            _id: this._id,
            'name': this.name,
            'roles': this.roles,
            'email': this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            phone: this.phone,
            address: this.address,
            city: this.city,
            state: this.state,
            zip: this.zip

        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'roles': this.roles
        };
    });

/**
 * Validations
 */

// Validate empty email
// UserSchema
//     .path('email')
//     .validate(function(email) {
//         if (authTypes.indexOf(this.provider) !== -1) return true;
//         return email.length;
//     }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('hashedPassword')
    .validate(function(hashedPassword) {
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return hashedPassword.length;
    }, 'Password cannot be blank');

// Validate email is not taken
// UserSchema
//     .path('email')
//     .validate(function(value, respond) {
//         var self = this;
//         this.constructor.findOne({
//             email: value
//         }, function(err, user) {
//             if (err) throw err;
//             if (user) {
//                 if (self.id === user.id) return respond(true);
//                 return respond(false);
//             }
//             respond(true);
//         });
//     }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) {
            next(new Error('Invalid password'));
        } else {

            //default the user roles
            var pos = this.roles.map(function(e) {
                return e.role;
            }).indexOf('user');

            if (pos === -1) {
                this.roles.push({
                    role: 'user'
                });
            }

            next();
        }

    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};


UserSchema.plugin(timestamps);
UserSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
