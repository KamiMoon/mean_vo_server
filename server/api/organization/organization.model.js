'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    short_description: String
});

module.exports = mongoose.model('Organization', OrganizationSchema);