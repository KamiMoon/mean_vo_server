'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var RegistrationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        childPath: 'registrations'
    }
});

RegistrationSchema.plugin(relationship, {
    relationshipPathName: 'user_id'
});

module.exports = mongoose.model('Registration', RegistrationSchema);