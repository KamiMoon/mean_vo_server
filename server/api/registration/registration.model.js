'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require('mongoose-relationship');
var validate = require('mongoose-validator');

var RegistrationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        childPath: 'registrations'
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        childPath: 'registrations'
    },
    hour_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hour'
    },
    status_id: {
        type: Number,
        ref: 'Status',
        default: 1
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
    }
});

RegistrationSchema.plugin(relationship, {
    relationshipPathName: ['user_id', 'event_id']
});

module.exports = mongoose.model('Registration', RegistrationSchema);
