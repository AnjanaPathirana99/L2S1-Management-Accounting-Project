const express = require('express');
const { checkUser, addUser } = require('../controllers/user.controller');
const router = express.Router();
const user = require('../controllers/user.controller');
router.post('/login',checkUser);
router.post('/register',addUser);

module.exports=router;