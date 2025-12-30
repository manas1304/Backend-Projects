const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');
const verifyUserMW = require('../middleWare/verifyUserReqBody');


// Creating the route for signup for the authController
route.post("/auth/signup",[verifyUserMW.verifyUserReqBody], authController.signUp);

// Creating a route for signin for the authController
route.post("/auth/signin", authController.signin)

module.exports = route;