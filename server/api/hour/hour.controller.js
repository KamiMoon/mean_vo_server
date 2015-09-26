'use strict';

var _ = require('lodash');
var Hour = require('./hour.model');

// Get list of hours
exports.index = function(req, res) {
  Hour.find(function (err, hours) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(hours);
  });
};

// Get a single hour
exports.show = function(req, res) {
  Hour.findById(req.params.id, function (err, hour) {
    if(err) { return handleError(res, err); }
    if(!hour) { return res.status(404).send('Not Found'); }
    return res.json(hour);
  });
};

// Creates a new hour in the DB.
exports.create = function(req, res) {
  Hour.create(req.body, function(err, hour) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(hour);
  });
};

// Updates an existing hour in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hour.findById(req.params.id, function (err, hour) {
    if (err) { return handleError(res, err); }
    if(!hour) { return res.status(404).send('Not Found'); }
    var updated = _.merge(hour, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(hour);
    });
  });
};

// Deletes a hour from the DB.
exports.destroy = function(req, res) {
  Hour.findById(req.params.id, function (err, hour) {
    if(err) { return handleError(res, err); }
    if(!hour) { return res.status(404).send('Not Found'); }
    hour.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}