'use strict';

var _ = require('lodash');
var Interest = require('./interest.model');

// Get list of interests
exports.index = function(req, res) {
  Interest.find(function (err, interests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(interests);
  });
};

// Get a single interest
exports.show = function(req, res) {
  Interest.findById(req.params.id, function (err, interest) {
    if(err) { return handleError(res, err); }
    if(!interest) { return res.status(404).send('Not Found'); }
    return res.json(interest);
  });
};

// Creates a new interest in the DB.
exports.create = function(req, res) {
  Interest.create(req.body, function(err, interest) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(interest);
  });
};

// Updates an existing interest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Interest.findById(req.params.id, function (err, interest) {
    if (err) { return handleError(res, err); }
    if(!interest) { return res.status(404).send('Not Found'); }
    var updated = _.merge(interest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(interest);
    });
  });
};

// Deletes a interest from the DB.
exports.destroy = function(req, res) {
  Interest.findById(req.params.id, function (err, interest) {
    if(err) { return handleError(res, err); }
    if(!interest) { return res.status(404).send('Not Found'); }
    interest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}