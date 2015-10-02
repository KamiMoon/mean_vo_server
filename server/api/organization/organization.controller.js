'use strict';

var Organization = require('./organization.model');
var ControllerUtil = require('../../components/controllerUtil');

exports.index = function(req, res) {
    ControllerUtil.find(req, res, Organization);
};

exports.show = function(req, res) {
    ControllerUtil.findById(req, res, Organization, 'events');
};

exports.create = function(req, res) {
    var postedObj;

    if (req.body.data) {
        //isDataMode = true;
        postedObj = JSON.parse(req.body.data);
    } else {
        postedObj = req.body;
    }

    if (req.file) {
        postedObj.photo = req.file.path;
    }


    Organization.create(postedObj, function(err, organization) {

        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        return res.status(201).json(organization);
    });
};

exports.update = function(req, res) {
    ControllerUtil.update(req, res, Organization, 'photo');
};

exports.destroy = function(req, res) {
    ControllerUtil.findByIdAndRemove(req, res, Organization);
};
