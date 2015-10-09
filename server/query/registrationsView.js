//var User = require('../api/user/user.model');
var Registration = require('../api/registration/registration.model');
//var Hour = require('../api/hour/hour.model');
//var Event = require('../api/event/event.model');
var Organization = require('../api/organization/organization.model');


//all registrations for a user
//Event Name | Organization Name | Start Time | End Time | Hour | Status

/*

SELECT
			sum(Hour.hours) AS total,
			User.first_name, User.last_name, 
			Event.id, Event.name, Event.organization_id,
			Organization.name, Organization.id, 
			Registration.start_time, Registration.end_time, Registration.user_id,  Registration.id,
			Status.id, Status.status
		FROM 
			users as User, events as Event, registrations as Registration, organizations as Organization, statuses as Status, hours as Hour
		WHERE
			User.id = Registration.user_id
			AND Registration.user_id = Hour.user_id
			AND Registration.event_id = Event.id
			AND Organization.id = Event.organization_id
			AND Status.id = Registration.status_id
			AND User.id = ?
			AND User.activated = 1 
Group By Registration.user_id
Order By total;

*/


var getRegistrationRow = function(registrationId, callback) {

    var registrationView = {};
    /*
        Registration.findById(registrationId, function(er, registration) {
            console.log(registration)

            Hour.findOne({
                user_id: userId,
                registration_id: registration._id
            }, {}, function(er, hour) {
                console.log(hour);

                registrationView.hours = hour.hours;

                Event.findById(registration.event_id, function(er, event) {
                    console.log(event);

                    registrationView.eventName = event.name;


                    Organization.findById(event.organization_id, function(er, organization) {
                        console.log(organization);

                        registrationView.organizationName = organization.name;

                        callback(registrationView);
                    });
                });
            });

        });
    */


    //TODO - lean

    Registration.findById(registrationId).populate(Registration.getPopulateFields()).exec(function(err, registration) {
        if (err) {
            return callback(err, null);
        }

        console.log(registration);

        if (registration.hour_id) {
            registrationView.hours = registration.hour_id.hours;
        }

        registrationView._id = registration._id;
        registrationView.eventName = registration.event_id.name;

        Organization.findById(registration.event_id.organization_id, function(err, organization) {
            if (err) {
                return callback(err, null);
            }
            registrationView.organizationName = organization.name;

            return callback(err, registrationView);
        });
    })
};

//given a userID 
/*
var findRegistrationView = function(userId, registrationIds) {

    var results = [];

    for (var i = 0; i < registrationIds.length; i++) {

        Registration.findById()
    }




};*/

function findRegistrationView(userId, registrationIds, callback) {
    var executed = 0;
    var registrationViews = [];

    for (var i = 0; i < registrationIds.length; i++) {

        getRegistrationRow(registrationIds[i], function(err, registrationView) {
            if (err) {
                return callback(err);
            }

            console.log(i);

            registrationViews.push(registrationView);

            if (++executed === registrationIds.length) {
                return callback(err, registrationViews);
            }
        });

    }
}


module.exports = {
    findRegistrationView: findRegistrationView
};
