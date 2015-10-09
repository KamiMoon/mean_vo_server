'use strict';

var _ = require('lodash');
var Registration = require('./registration.model');

// Get list of registrations
exports.index = function(req, res) {
    Registration.find(function(err, registrations) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(registrations);
    });
};

// Get a single registration
exports.show = function(req, res) {
    Registration.findById(req.params.id).populate('event_id user_id').exec(function(err, registration) {
        if (err) {
            return handleError(res, err);
        }
        if (!registration) {
            return res.status(404).send('Not Found');
        }
        return res.json(registration);
    });
};

// Creates a new registration in the DB.
exports.create = function(req, res) {
    Registration.create(req.body, function(err, registration) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(registration);
    });
};

// Updates an existing registration in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Registration.findById(req.params.id, function(err, registration) {
        if (err) {
            return handleError(res, err);
        }
        if (!registration) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(registration, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(registration);
        });
    });
};

// Deletes a registration from the DB.
exports.destroy = function(req, res) {
    Registration.findById(req.params.id, function(err, registration) {
        if (err) {
            return handleError(res, err);
        }
        if (!registration) {
            return res.status(404).send('Not Found');
        }
        registration.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
