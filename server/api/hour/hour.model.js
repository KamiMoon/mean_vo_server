'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var relationship = require('mongoose-relationship');

var HourSchema = new Schema({
    status_id: {
        type: Schema.Types.ObjectId,
        ref: 'Status'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        childPath: 'hours'
    },
    registration_id: {
        type: Schema.Types.ObjectId,
        ref: 'Registration',
        childPath: 'hour_id'
    },
    hours: {
        type: Number
    },
    school_status: {
        type: Number
    }
});

HourSchema.plugin(relationship, {
    relationshipPathName: ['user_id', 'registration_id']
});

HourSchema.plugin(timestamps);
module.exports = mongoose.model('Hour', HourSchema);
