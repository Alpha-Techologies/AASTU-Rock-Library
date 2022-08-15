
const express = require("express");

const rockController = require("./../Controller/rockController");
const authController  =  require('../Controller/authController');

const router = express.Router();

router
  .route('/')
  .get(rockController.getAllRocks)
  .post(rockController.storeRocks)
  // .patch(rockController.updateRock)
  

router
  .route('/:id')
  .get(rockController.getRock)
  // .post(rockController.updateRock)
  .delete(rockController.deleteRock)
  .patch(rockController.editRock)

  // authController.restrictTo('admin'),
module.exports = router;
