'use strict';

var express = require('express');
var router = express.Router();

var Status = require('./status.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, Status);
});

module.exports = router;
