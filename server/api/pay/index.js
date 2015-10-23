'use strict';

var express = require('express');
var ControllerUtil = require('../../components/controllerUtil');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require('stripe')('sk_test_hdEpFYjqCu8t9QHg1DwXdCta');

var router = express.Router();

router.post('/once', function(request, res) {

    console.log('once');

    console.log(request.body);

    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = request.body.stripeToken;

    var charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: 'usd',
        source: stripeToken,
        description: 'Example charge'
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            // The card has been declined
            ControllerUtil.handleError(err);
        }

        return res.status(201).json('success');
    });
});

module.exports = router;
