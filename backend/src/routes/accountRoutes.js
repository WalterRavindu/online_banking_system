const express = require('express');
const { createAccount, getUserAccounts } = require('../controllers/accountController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Protect this route with JWT
router.post('/create',/* verifyToken,*/ createAccount);
router.get('/my-accounts', /* verifyToken,*/ getUserAccounts);
module.exports = router;



