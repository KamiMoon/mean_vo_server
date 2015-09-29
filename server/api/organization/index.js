'use strict';

var express = require('express');
var controller = require('./organization.controller');
var config = require('../../config/environment');

var upload = config.createUpload('organizations');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
