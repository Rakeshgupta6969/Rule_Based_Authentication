const express = require("express");
const authController = require("../Controller/user.Controller");


const router = express.Router();

router.post("/register",authController.userRegister);
router.post("/login",authController.userLogin);

module.exports = router;