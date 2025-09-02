require('dotenv').config();
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/addUser', userController.addUser); // ✅ Add semicolon

module.exports = router; // ✅ Export the router
