'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    organization_name: String,
    role: {
        type: String
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = MemberSchema;
