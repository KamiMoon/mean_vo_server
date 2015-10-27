'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ControllerUtil = require('../../components/controllerUtil');


router.put('/update', function(req, res) {
    var updateObj = req.body;

    //special case - update the user roles 
    if (updateObj.modelObj === 'Role') {
        console.log('trying to update roles');
        console.log(updateObj);

        mongoose.models['User'].findOneAndUpdate({
            '_id': updateObj.userId,
            'roles._id': updateObj.id
        }, {
            '$set': {
                'roles.$.status': updateObj.status
            }
        }, function(err, result) {
            if (err) {
                ControllerUtil.handleError(err);
            }

            res.status(200).json(result);

        });
    } else if (updateObj.modelObj === 'Registration') {
        console.log('trying to update registration');
        console.log(updateObj);

        mongoose.models['Event'].findOneAndUpdate({
            '_id': updateObj.eventId,
            'registrations._id': updateObj.id
        }, {
            '$set': {
                'registrations.$.status': updateObj.status
            }
        }, function(err, result) {
            if (err) {
                ControllerUtil.handleError(err);
            }

            res.status(200).json(result);

        });
    } else if (updateObj.modelObj === 'Hour') {
        console.log('trying to update hour');
        console.log(updateObj);

        mongoose.models['Event'].findOneAndUpdate({
            '_id': updateObj.eventId,
            'registrations._id': updateObj.id
        }, {
            '$set': {
                'registrations.$.hour_status': updateObj.status
            }
        }, function(err, result) {
            if (err) {
                ControllerUtil.handleError(err);
            }

            res.status(200).json(result);

        });
    } else {
        //update the organization or the event or any model with status
        mongoose.models[updateObj.modelObj].findOneAndUpdate({
            '_id': updateObj.id
        }, {
            'status': updateObj.status
        }, function(err, result) {
            if (err) {
                ControllerUtil.handleError(err);
            }

            res.status(200).json(result);

        });
    }


});

module.exports = router;
