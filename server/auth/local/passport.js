var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function(User, config) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        },
        function(email, password, done) {
            User.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) return done(err);

                if (!user) {
                    return done(null, false, {
                        message: 'This email is not registered.'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'This password is not correct.'
                    });
                }

                console.log('Checking if user is activated');
                if (!user.activated) {
                    return done(null, false, {
                        message: 'Your account is not activated.  Check your email for an activation link.'
                    });
                }

                return done(null, user);
            });
        }
    ));
};