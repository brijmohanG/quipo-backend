require('dotenv').config();
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/addUser', userController.addUser); 
router.get('/all', userController.findAllUser);
router.get('/details', userController.findUser);
router.delete('/delete', userController.deleteUser);
module.exports = router; 
