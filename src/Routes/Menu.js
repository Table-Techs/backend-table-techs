const express = require("express");

const MenuController = require("../Controllers/Menu");

const router = express.Router();

router.get("/", MenuController.getMenuByRestaurantId);
router.get("/all", MenuController.getAllMenus);
router.put("/:id", MenuController.updateMenuById);
router.post("/create", MenuController.createMenu);

module.exports = router;