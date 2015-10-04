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
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    status_id: {
        type: Schema.Types.ObjectId,
        ref: 'Status'
    }
});

module.exports = mongoose.model('Member', MemberSchema);
