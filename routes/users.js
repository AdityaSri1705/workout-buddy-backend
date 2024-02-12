const express = require("express");
const router = express.Router();

// controller
const { loginUser, signupUser } = require("../controller/userController");

// Login routes
router.post("/login", loginUser);

// Signup routes
router.post("/signup", signupUser);

module.exports = router;
