const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth.controller');
const verifyUserReqBody = require('../middlewares/verifyUserReqBody');

// Creating endpoint for signup 
route.post("/auth/signup", [verifyUserReqBody.verifyUserReqBody], authController.signup);

module.exports = route;