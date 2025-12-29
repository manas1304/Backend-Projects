const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');


// Creating the route for the authController
route.post("/auth/signup", authController.signUp);

module.exports = route;