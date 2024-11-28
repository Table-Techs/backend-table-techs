const express = require("express");

const StripeController = require("../Controllers/Stripe");

const router = express.Router();

router.get("/config", StripeController.getConfig);
router.post("/createPaymentIntent", StripeController.createPaymentIntent);

module.exports = router;