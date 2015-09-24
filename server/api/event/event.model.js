'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');
var relationship = require("mongoose-relationship");

var EventSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        childPath: 'events'
    },
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
    photo: String,
    contact_first_name: String,
    contact_last_name: String,
    address: String,
    city: String,
    abbrev: String,
    zip: String
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