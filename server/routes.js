/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/pay', require('./api/pay'));
    app.use('/api/status', require('./api/status'));
    app.use('/api/constants', require('./api/constant'));
    app.use('/api/members', require('./api/member'));
    app.use('/api/events', require('./api/event'));
    app.use('/api/organizations', require('./api/organization'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets|uploads)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};
