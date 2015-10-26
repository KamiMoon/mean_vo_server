'use strict';

var Organization = require('./organization.model');
var User = require('../user/user.model');
var mongoose = require('mongoose');

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

    var user_id = postedObj.user_id;

    Organization.create(postedObj, function(err, organization) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        User.findById(user_id, function(err, user) {
            if (err) {
                return ControllerUtil.handleError(res, err);
            }

            user.roles.push({
                role: 'Organization Admin Primary',
                organization_id: organization._id
            });

            user.save(function(err, user) {
                if (err) {
                    return ControllerUtil.handleError(res, err);
                }

                return res.status(201).json(organization);
            });
        });

    });
};

exports.update = function(req, res) {
    ControllerUtil.update(req, res, Organization, 'photo');
};

exports.destroy = function(req, res) {
    ControllerUtil.findByIdAndRemove(req, res, Organization);
};


exports.join = function(req, res) {
    var user_id = req.body.user_id;
    var organization_id = req.body.id;

    User.findById(user_id, function(err, user) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        var alreadyHasRole = false;
        for (var i = 0; i < user.roles.length; i++) {
            var currentRole = user.roles[i];

            if (currentRole.organization_id && currentRole.organization_id.toString() === organization_id.toString() && currentRole.role === 'Member') {
                alreadyHasRole = true;
                break;
            }
        }

        if (!alreadyHasRole) {
            user.roles.push({
                role: 'Member',
                organization_id: mongoose.Types.ObjectId(organization_id)
            });

            user.save(function(err, user) {
                if (err) {
                    return ControllerUtil.handleError(res, err);
                }

                return res.status(201).json(user);
            });
        } else {
            return res.status(201).json('Already has Role');
        }

    });

};
