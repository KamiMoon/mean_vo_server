'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Interest', InterestSchema);
