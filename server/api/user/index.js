'use strict';

var express = require('express');
var controller = require('./user.controller');
var fileUtil = require('../../components/fileUtil');
var auth = require('../../auth/auth.service');

var upload = fileUtil.getUpload();

var router = express.Router();

//router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', upload.single('file'), controller.update);
//router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/profile/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/:id', upload.single('file'), controller.update);


router.get('/activate/:id/:activationHash', controller.activate);

router.get('/registrations/:id', controller.registrations);

router.get('/:id/profile', controller.profile);

router.get('/leaderboard', controller.leaderboard);


module.exports = router;
