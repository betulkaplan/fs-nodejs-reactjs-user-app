const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// CheckLogin
router.get("/checkLogin", authController.checkLogin);

module.exports = router;
