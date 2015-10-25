'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');

var ProductSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: 'A product description is required.',
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 1000],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    price: {
        type: Number,
        required: 'A price is required.',
        validate: [
            validate({
                validator: function(val) {
                    return val > 0;
                },
                message: 'Price must be a positive number'
            })
        ]
    },
    photo: String,
    reviews: []
});

ProductSchema.plugin(timestamps);
ProductSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('Product', ProductSchema);
