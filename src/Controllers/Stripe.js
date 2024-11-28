const { infoLog, errorLog } = require("../Services/Logger");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getConfig = (req, res, next) => {
    try {
        infoLog('Fetching Stripe publishable key');
        res.status(200).json({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        errorLog('Error fetching Stripe publishable key', error);
        res.status(500).json({ error: 'Failed to fetch publishable key' });
    }
}

exports.createPaymentIntent = async (req, res, next) => {
    const { total } = req.body;

    if (!total || isNaN(total)) {
        infoLog('Invalid total amount in createPaymentIntent request');
        return res.status(400).json({
            error: 'Invalid or missing total amount'
        });
    }

    try {
        infoLog('Creating payment intent', { total });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "cad",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        infoLog('Payment intent created successfully', { clientSecret: paymentIntent.client_secret });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        errorLog('Error creating payment intent', error);
        res.status(500).json({
            error: 'Failed to create payment intent',
            clientSecret: null
        });
    }
}
