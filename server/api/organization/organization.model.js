'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');

var OrganizationSchema = new Schema({
    status: {
        type: String,
        default: 'Pending'
    },
    category: {
        type: String,
        default: 'Non-Profit'
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    interests: [{
        type: String
    }],
    name: {
        type: String,
        required: 'An organization name is required!',
        unique: true,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 20],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    url: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 50],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    email: {
        type: String,
        required: 'An email is required!',
        validate: [
            validate({
                validator: 'isEmail'
            })
        ]
    },
    phone: {
        type: String,
        validate: [
            validate({
                validator: 'isMobilePhone',
                arguments: 'en-US'
            })
        ]
    },
    short_description: {
        type: String,
        required: 'An short description is required!',
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 180],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    long_description: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 8000],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    photo: String,
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
    }
});

OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('Organization', OrganizationSchema);
