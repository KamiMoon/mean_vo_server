'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var InterestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        childPath: 'interests'
    },
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        childPath: 'interests'
    }
});

InterestSchema.plugin(relationship, {
    relationshipPathName: ['user_id', 'organization_id']
});

module.exports = mongoose.model('Interest', InterestSchema);