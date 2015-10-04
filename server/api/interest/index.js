'use strict';

var express = require('express');
var router = express.Router();

var Interest = require('./interest.model');
var ControllerUtil = require('../../components/controllerUtil');


router.get('/', function(req, res) {
    ControllerUtil.find(req, res, Interest);
});

router.post('/', function(req, res) {

    console.log('trying to create a new interest');

    ControllerUtil.create(req, res, Interest);
});

router.delete('/:id', function(req, res) {
    ControllerUtil.findByIdAndRemove(req, res, Interest);
});

module.exports = router;
