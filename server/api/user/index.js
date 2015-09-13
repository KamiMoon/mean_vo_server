'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multer = require('multer');
var fs = require("fs");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
            var newDestination = 'uploads/my-uploads/' + req.params.type;
            var stat = null;
            try {
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
            }

            cb(null, newDestination);
        }
        /*,
            filename: function(req, file, cb) {

                console.log(file);

                cb(null, file.fieldname + '-' + Date.now())
            }*/
});
var upload = multer({
    storage: storage
});

var router = express.Router();

//router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', controller.update);
//router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id', controller.show);
router.post('/', controller.create);

router.get('/activate/:id/:activationHash', controller.activate);

//req.file is the 'avatar' file
router.post('/avatar/:type', upload.single('avatar'), controller.uploadImage);

module.exports = router;