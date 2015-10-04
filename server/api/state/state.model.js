'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new Schema({
    name: String,
    abbrev: String
});

module.exports = mongoose.model('State', StateSchema);
