'use strict';

var express = require('express');
var router = express.Router();

var Role = require('./role.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, Role);
});

module.exports = router;
