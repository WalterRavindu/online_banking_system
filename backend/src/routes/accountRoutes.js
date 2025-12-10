const express = require('express');
const { createAccount } = require('../controllers/accountController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Protect this route with JWT
router.post('/create', /*verifyToken*/ createAccount);
module.exports = router;
