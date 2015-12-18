'use strict';

var stripeResponseHandler = function(status, response) {
    var $form = $('#payment-form');
    if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
    } else {
        // token contains id, last4, and card type
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and re-submit
        $form.get(0).submit();
    }
};

$(document).ready(function($) {
    $('#cc-number').payment('formatCardNumber');
    $('#cc-cvc').payment('formatCardCVC');
    $('#exp-month').payment('restrictNumeric');
    $('#exp-year').payment('restrictNumeric');


    $('#payment-form').submit(function(e) {
        var $form = $(this);

        var cardNumber = $("#cc-number").val();
        var cvc = $("#cc-cvc").val();
        var month = $("#exp-month").val();
        var year = $("#exp-year").val();
        var amount = $('#amount').val();

        var errorMessage = '';


        if (!amount || amount <= 0) {
            errorMessage += 'Enter an amount.\n';
        }

        var carTypeIsValid = $.payment.cardType(cardNumber);
        if (!carTypeIsValid) {
            errorMessage += 'Invalid card type.\n';
        }

        var cardNumberIsValid = $.payment.validateCardNumber(cardNumber);
        if (!cardNumberIsValid) {
            errorMessage += 'Invalid card number.\n';
        }

        var cvcIsValid = $.payment.validateCardCVC(cvc);
        if (!cvcIsValid) {
            errorMessage += 'Invalid CVC.\n';
        }

        var expiryIsValid = $.payment.validateCardExpiry(month, year);
        if (!expiryIsValid) {
            errorMessage += 'Invalid Expiry Date.\n';
        }


        if (errorMessage) {
            $form.find('.payment-errors').text(errorMessage);

        } else {
            // Disable the submit button to prevent repeated clicks
            $form.find('button').prop('disabled', true);
            Stripe.card.createToken($form, stripeResponseHandler);
        }

        // Prevent the form from submitting with the default action
        return false;
    });
});
