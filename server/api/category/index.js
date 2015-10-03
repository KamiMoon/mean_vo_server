'use strict';

var express = require('express');
var Category = require('./category.model');
var ControllerUtil = require('../../components/controllerUtil');

var router = express.Router();

router.get('/', function(req, res) {
    ControllerUtil.find(req, res, Category);
});

module.exports = router;
