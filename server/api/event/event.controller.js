'use strict';

var Event = require('./event.model');
var ControllerUtil = require('../../components/controllerUtil');

// Get list of events
exports.index = function(req, res) {
    ControllerUtil.find(req, res, Event);
};

// Get a single event
exports.show = function(req, res) {
    Event.findById(req.params.id).populate('organization_id').exec(function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        return res.json(event);
    });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
    Event.create(req.body, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(event);
    });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
    ControllerUtil.update(req, res, Event, 'photo');
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        event.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

exports.register = function(req, res) {

    console.log('register');

    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }

        if (!req.body.user_id) {
            res.status(500).send(['Not logged in.']);
        }

        var alreadyExists = false;

        for (var i = 0; i < event.registrations.length; i++) {
            var userId = event.registrations[i].user_id.toString();

            if (req.body.user_id === userId) {
                alreadyExists = true;
                break;
            }
        }
        if (!alreadyExists) {
            event.registrations.push(req.body);
        }

        event.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(event);
        });

    });

};

exports.unregister = function(req, res) {

    console.log('unregister');

    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }

        //find the current by user id
        for (var i = event.registrations.length - 1; i >= 0; i--) {
            var userId = event.registrations[i].user_id.toString();

            if (req.body.user_id === userId) {
                event.registrations.splice(i, 1);
            }
        }

        console.log(event.registrations);

        event.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(event);
        });

    });

};


exports.updateregistration = function(req, res) {

    console.log('updateregistration');

    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }

        if (!req.body.user_id) {
            res.status(500).send(['Not logged in.']);
        }

        for (var i = 0; i < event.registrations.length; i++) {
            var userId = event.registrations[i].user_id.toString();

            if (req.body.user_id === userId) {

                ControllerUtil.merge(event.registrations[i], req.body);

                break;
            }
        }

        event.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(event);
        });

    });

};



function handleError(res, err) {
    return res.status(500).send(err);
}
