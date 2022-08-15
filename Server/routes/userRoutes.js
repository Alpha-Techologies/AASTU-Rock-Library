const mongoose = require("mongoose");
const express = require("express");

const authController = require("./../Controller/authController");
const userController = require("./../Controller/userController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/editors",authController.protect, userController.getAllUsers);
//router.post('/forgotPassword' ,authController.forgotPassword)
//router.post('/resetPassword' ,authController.resetPassword)
// router.patch(
//   "/updatePassword",
//   authController.protect,
//   authController.updatePassword
// );
// router.delete("/deleteMe", authController.protect, userController.deleteMe);
// router.patch("/updateMe", authController.protect, userController.updateMe);


// router.route("/:id");
//   .get(authController.protect, userController.getUser)
//   .patch(authController.protect, userController.updateUser)
//   .delete(authController.protect, userController.deleteUser);

module.exports = router;