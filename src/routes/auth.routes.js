const express = require('express');
const authController = require('../controller/auth.controllers');
const router = express.Router();

///post /api/auth/register
router.post("/register", authController.registerUser)

//post /api/auth/login
router.post("/login", authController.loginuser)




module.exports = router