const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const accountController = require('../controller/account.controller');


const router = express.Router();

/**
 * -Post /api/accounts/
 * -Create a new account
 *  - Protected Route
 */
router.post("/",authMiddleware, accountController.createAccount)




module.exports = router;