'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ControllerUtil = require('../../components/controllerUtil');


router.put('/update', function(req, res) {
    var updateObj = req.body;

    mongoose.models[updateObj.modelObj].findOneAndUpdate({
        _id: updateObj.id
    }, {
        status: updateObj.status
    }, function(err, result) {
        if (err) {
            ControllerUtil.handleError(err);
        }

        res.status(200).json(result);

    });

});

module.exports = router;
