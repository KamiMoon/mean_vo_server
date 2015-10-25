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

    /*
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
*/

    //Request
    //stripeToken
    //userId
    //productId

    //Process
    //lookup product by ID -> is this a valid product?
    //lookup user by ID -> is this an existing user?
    //is this user an existing customer?
    //if not create new stripe customer
    //create charge to stripe via customer
    //using price for the product
    //create invoice - save transaction history
    //save invoice data in metadata
    //send email to user

    //Response
    //redirect


    stripe.customers.create({
        source: stripeToken,
        description: 'payinguser@example.com'
    }).then(function(customer) {
        stripe.charges.create({
            amount: 1000, // amount in cents, again
            currency: 'usd',
            customer: customer.id,
            description: 'Example Charge',
            metadata: {
                'order_id': '6735'
            }
        }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
                // The card has been declined
                ControllerUtil.handleError(err);
            }
            console.log('customer:');
            console.log(customer);
            console.log('charge:');
            console.log(charge);

            return res.status(201).json('success');
        });
    });
});

module.exports = router;
