'use strict';

var express = require('express');
var router = express.Router();
var User = require('../user/user.model');
var Organization = require('../organization/organization.model');
var Event = require('../event/event.model');

router.put('/update', function(req, res) {
    var updateObj = req.body;

    res.status(200).json(updateObj);
});

module.exports = router;
