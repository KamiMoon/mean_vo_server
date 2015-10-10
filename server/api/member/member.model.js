'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    role: {
        type: String
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model('Member', MemberSchema);
