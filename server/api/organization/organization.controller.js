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
                organization_id: organization._id,
                organization_name: organization.name
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
    var organization_name = req.body.organization_name;

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
                organization_id: mongoose.Types.ObjectId(organization_id),
                organization_name: organization_name
            });

            user.save(function(err, user) {
                if (err) {
                    return ControllerUtil.handleError(res, err);
                }

                return res.status(200).json(user);
            });
        } else {
            return res.status(200).json('Already has Role');
        }

    });

};

exports.leave = function(req, res) {
    var user_id = req.body.user_id;
    var organization_id = req.body.id;

    User.findById(user_id, function(err, user) {
        if (err) {
            return ControllerUtil.handleError(res, err);
        }

        //find the current by user id
        for (var i = user.roles.length - 1; i >= 0; i--) {
            var currentRole = user.roles[i];

            //remove any role related to this organization
            if (currentRole.organization_id && currentRole.organization_id.toString() === organization_id.toString()) {
                user.roles.splice(i, 1);
            }
        }

        user.save(function(err, user) {
            if (err) {
                return ControllerUtil.handleError(res, err);
            }

            return res.status(200).json(user);
        });

    });

};

exports.members = function(req, res) {

    var organization_id = mongoose.Types.ObjectId(req.params.id);

    console.log(organization_id);

    User.aggregate(
        [{
            $unwind: '$roles'
        }, {
            $match: {
                'roles.organization_id': organization_id
            }
        }, {
            $project: {
                'name': 1,
                'roles': 1
            }
        }],
        function(err, results) {
            if (err) {
                return ControllerUtil.handleError(res, err);
            }

            return ControllerUtil.success(res, results);
        });

};
