'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');

var LineItemSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: 'A quantity is required',
        validate: [
            validate({
                validator: function(val) {
                    return val > 0;
                },
                message: 'Quanity must be a positive number'
            })
        ]
    }
});

LineItemSchema.plugin(timestamps);
LineItemSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('LineItem', LineItemSchema);
