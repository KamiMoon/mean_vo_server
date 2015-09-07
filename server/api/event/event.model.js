'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    description: String,
    email: String,
    phone: String,
    photo: String,
    contact_first_name: String,
    contact_last_name: String,
    address: String,
    city: String,
    abbrev: String,
    zip: String
});

module.exports = mongoose.model('Event', EventSchema);