'use strict';

var express = require('express');
var router = express.Router();

var State = require('./state.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, State);
});

module.exports = router;
