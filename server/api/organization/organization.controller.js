'use strict';

var _ = require('lodash');
var Organization = require('./organization.model');
var ControllerUtil = require('../../components/controllerUtil');

// Get list of organizations
exports.index = function(req, res) {

    //return everything
    var projection = {};
    var query = ControllerUtil.getQuery(req);

    Organization.find(query, projection, function(err, organizations) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }
        return res.status(200).json(organizations);
    });
};

// Get a single organization
exports.show = function(req, res) {

    console.log('Organization show');

    Organization.findById(req.params.id).populate('events').exec(function(err, organization) {
        if (err) {
            return handleError(res, err);
        }
        if (!organization) {
            return res.status(404).send('Not Found');
        }
        return res.json(organization);
    });
};

// Creates a new organization in the DB.
exports.create = function(req, res) {
    Organization.create(req.body, function(err, organization) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(organization);
    });
};

// Updates an existing organization in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Organization.findById(req.params.id, function(err, organization) {
        if (err) {
            return handleError(res, err);
        }
        if (!organization) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(organization, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(organization);
        });
    });
};

// Deletes a organization from the DB.
exports.destroy = function(req, res) {
    Organization.findById(req.params.id, function(err, organization) {
        if (err) {
            return handleError(res, err);
        }
        if (!organization) {
            return res.status(404).send('Not Found');
        }
        organization.remove(function(err) {
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