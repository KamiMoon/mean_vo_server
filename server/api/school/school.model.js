'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    _id: Number,
    name: String
});

module.exports = mongoose.model('School', SchoolSchema);