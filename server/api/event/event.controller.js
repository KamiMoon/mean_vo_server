'use strict';

var _ = require('lodash');
var Event = require('./event.model');

// Get list of events
exports.index = function(req, res) {
    Event.find(function(err, events) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(events);
    });
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

    console.log('event update on the server');

    // if (req.body._id) {
    //     delete req.body._id;
    // }
    // Event.findById(req.params.id, function(err, event) {
    //     if (err) {
    //         return handleError(res, err);
    //     }
    //     if (!event) {
    //         return res.status(404).send('Not Found');
    //     }

    //     _.merge(event, req.body);

    //     console.log(event);

    //     event.interests = req.body.interests;

    //     event.save(function(err) {
    //         if (err) {
    //             return handleError(res, err);
    //         }
    //         return res.status(200).json(event);
    //     });

    // });

    console.log(req.body);

    Event.update({
        _id: req.body._id
    }, req.body, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(event);
    });

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

function handleError(res, err) {
    return res.status(500).send(err);
}
