'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');
var relationship = require("mongoose-relationship");
var State = require('../state/state.model');
var Event = require('../event/event.model');

var OrganizationSchema = new Schema({
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
    state_id: {
        type: Number,
        ref: 'State'
    },
    status_id: Number,
    category_id: Number,
    photo: String,
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('Organization', OrganizationSchema);