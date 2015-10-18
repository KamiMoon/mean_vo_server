'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var relationship = require('mongoose-relationship');
var validate = require('mongoose-validator');

var RegistrationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'Pending'
    },
    start_time: Date,
    end_time: Date,
    comment: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 250],
                message: 'Comment should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    hour_status: {
        type: String,
        default: 'Pending'
    },
    hours: {
        type: Number
    }
});

// RegistrationSchema.plugin(relationship, {
//     relationshipPathName: ['user_id']
// });


module.exports = RegistrationSchema;
