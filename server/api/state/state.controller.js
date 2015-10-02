'use strict';

var State = require('./state.model');
var ControllerUtil = require('../../components/controllerUtil');

exports.index = function(req, res) {
    ControllerUtil.find(req, res, State);
};
