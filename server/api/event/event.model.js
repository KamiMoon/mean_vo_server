'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var uniqueValidator = require('mongoose-unique-validator');
var relationship = require('mongoose-relationship');
var RegistrationSchema = require('./registration.model');

var EventSchema = new Schema({
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        childPath: 'events'
    },
    status: {
        type: 'String',
        default: 'Pending'
    },
    interests: [{
        type: String
    }],
    registrations: [RegistrationSchema],
    name: {
        type: String,
        required: 'An event name is required',
        unique: true,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 20],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    description: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [3, 20],
                message: 'Description should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    photo: String,
    contact_first_name: String,
    contact_last_name: String,
    email: {
        type: String,
        required: 'An email is required!',
        validate: [
            validate({
                validator: 'isEmail'
            })
        ]
    },
    phone: {
        type: String,
        validate: [
            validate({
                validator: 'isMobilePhone',
                arguments: 'en-US'
            })
        ]
    },
    address: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 50]
            })
        ]
    },
    city: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 50]
            })
        ]
    },
    state: {
        type: String
    },
    zip: {
        type: String,
        validate: [
            validate({
                validator: 'isLength',
                arguments: [0, 16]
            })
        ]
    }
});


EventSchema.statics.getEventsRegisteredByUser = function(user_id, cb) {
    return this.find({
        'registrations.user_id': user_id
    }).lean().exec(cb);
};




/*

EventSchema.statics = {

    getEventsRegisteredByUser: function(user_id, cb) {
        return this.find({
            'registrations.user_id': user_id
        }, cb);
    },

    getEventsCreatedByOrganization: function(organization_id, cb) {
        return this.find({
            'organization_id': organization_id
        }, cb);
    },

    getHoursForUser: function(user_id, cb) {
        return this.aggregate([{
            $match: {
                'registrations.user_id': user_id
            }
        }, {
            $unwind: '$registrations'
        }, {
            $match: {
                'registrations.user_id': user_id
            }
        }], cb);
    }

};


*/






//TODO - refactor - this is becoming repetitive
EventSchema.plugin(timestamps);
EventSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.'
});

EventSchema.plugin(relationship, {
    relationshipPathName: 'organization_id'
});

module.exports = mongoose.model('Event', EventSchema);
