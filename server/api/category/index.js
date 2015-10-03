'use strict';

var express = require('express');
var router = express.Router();

var Category = require('./category.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, Category);
});

module.exports = router;
