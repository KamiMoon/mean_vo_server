'use strict';

var _ = require('lodash');
var Member = require('./member.model');

// Get list of members
exports.index = function(req, res) {
  Member.find(function (err, members) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(members);
  });
};

// Get a single member
exports.show = function(req, res) {
  Member.findById(req.params.id, function (err, member) {
    if(err) { return handleError(res, err); }
    if(!member) { return res.status(404).send('Not Found'); }
    return res.json(member);
  });
};

// Creates a new member in the DB.
exports.create = function(req, res) {
  Member.create(req.body, function(err, member) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(member);
  });
};

// Updates an existing member in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Member.findById(req.params.id, function (err, member) {
    if (err) { return handleError(res, err); }
    if(!member) { return res.status(404).send('Not Found'); }
    var updated = _.merge(member, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(member);
    });
  });
};

// Deletes a member from the DB.
exports.destroy = function(req, res) {
  Member.findById(req.params.id, function (err, member) {
    if(err) { return handleError(res, err); }
    if(!member) { return res.status(404).send('Not Found'); }
    member.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}