'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    _id: Number,
    name: String
});

module.exports = mongoose.model('Category', CategorySchema);