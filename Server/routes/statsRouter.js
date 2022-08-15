const express = require("express");

const rockController = require("./../Controller/rockController");
const authController = require("../Controller/authController");

const router = express.Router();

router.route("/");
// .patch(rockController.updateRock)

router.route("/:id").get(rockController.getStats);

// authController.restrictTo('admin'),
module.exports = router;
