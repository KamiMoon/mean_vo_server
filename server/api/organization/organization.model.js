'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var OrganizationSchema = new Schema({
    name: {
        type: String,
        required: 'An organization name is required!',
        validate: nameValidator
    },
    email: {
        type: String,
        required: 'An email is required!'
    },
    phone: String,
    short_description: {
        type: String,
        required: 'An short description is required!'
    },
    created: Date
});

module.exports = mongoose.model('Organization', OrganizationSchema);