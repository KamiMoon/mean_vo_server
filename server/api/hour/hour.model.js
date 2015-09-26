'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var HourSchema = new Schema({
    status_id: {
        type: Number,
        ref: 'Status',
        default: 1
    },
    user_id: {
        type: Schema.Types.ObjectId,
    },
    registration_id: {
        type: Schema.Types.ObjectId,
    },
    hours: {
        type: Number
    },
    school_status: {
        type: Number
    }
});

HourSchema.plugin(timestamps);
module.exports = mongoose.model('Hour', HourSchema);