'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
    _id: Number,
    name: String
});

module.exports = mongoose.model('Status', StatusSchema);