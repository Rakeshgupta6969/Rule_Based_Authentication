const express = require("express");
const authController = require("../Controller/user.Controller");


const router = express.Router();

router.post("/register",authController.userRegister);
router.post("/login",authController.userLogin);
router.post("/logout",authController.userLogout);

module.exports = router;