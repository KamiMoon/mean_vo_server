'use strict';

var RegistrationsView = require('./registrationsView');



describe('Registrations View', function() {

    it('should run', function(done) {
        RegistrationsView.findRegistrationViewForUser('5611b5006f4e9a01543d0a4e', function(err, user) {
            console.log(err);

            console.log(user);

            done();
        })
    });

});
