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
    role_id: {
        type: Number,
        ref: 'Role'
    },
    status_id: {
        type: Number,
        ref: 'Status',
        default: 1
    }
});

module.exports = mongoose.model('Member', MemberSchema);