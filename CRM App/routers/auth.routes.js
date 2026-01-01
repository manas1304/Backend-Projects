const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth.controller');

// Creating endpoint for signup 
route.post("/auth/signup", authController.signup);

module.exports = route;