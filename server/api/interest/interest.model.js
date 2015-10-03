'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestSchema = new Schema({
    _id: Number,
    name: String
});

module.exports = mongoose.model('Interest', InterestSchema);
