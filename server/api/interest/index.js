'use strict';

var express = require('express');
var router = express.Router();

var Interest = require('./interest.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, Interest);
});

module.exports = router;
