'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');

var CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    lineItems: []
});

CartSchema.plugin(timestamps);
CartSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('Cart', CartSchema);
