'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');
var relationship = require('mongoose-relationship');
var RegistrationSchema = require('./registration.model');

var EventSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        childPath: 'events'
    },
    status_id: {
        type: Schema.Types.ObjectId,
        ref: 'Status'
    },
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interest'
    }],
    registrations: [RegistrationSchema],
    name: {
        type: String,
        required: 'An event name is required',
        unique: true,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 20],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    description: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 20],
                message: 'Description should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    photo: String,
    contact_first_name: String,
    contact_last_name: String,
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
    state_id: {
        type: Schema.Types.ObjectId,
        ref: 'State'
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

//TODO - refactor - this is becoming repetitive
EventSchema.plugin(timestamps);
EventSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

EventSchema.plugin(relationship, {
    relationshipPathName: 'organization_id'
});

module.exports = mongoose.model('Event', EventSchema);
