const express = require("express");

const RestaurantController = require("../Controllers/Restaurant");

const router = express.Router();

router.get("/", RestaurantController.getAllRestaurants);
router.get("/:id", RestaurantController.getRestaurantById);
router.put("/:id", RestaurantController.updateRestaurantById);
router.post("/create", RestaurantController.createRestaurant);

module.exports = router;