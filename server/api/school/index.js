'use strict';

var express = require('express');
var router = express.Router();

var School = require('./school.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, School);
});

module.exports = router;
