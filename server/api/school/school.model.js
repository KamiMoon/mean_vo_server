'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    name: String
});

module.exports = mongoose.model('School', SchoolSchema);
