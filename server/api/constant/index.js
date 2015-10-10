'use strict';

var express = require('express');
var constants = require('./constants');

var router = express.Router();

var getHandler = function(data) {
    return function(req, res) {
        return res.status(200).json(data);
    };
};

router.get('/statuses', getHandler(constants.statuses));
router.get('/schools', getHandler(constants.schools));
router.get('/interests', getHandler(constants.interests));
router.get('/categories', getHandler(constants.categories));
router.get('/states', getHandler(constants.states));

module.exports = router;
