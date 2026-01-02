const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller')
const authMW = require('../middlewares/authjwt');

route.get("/users", [authMW.verifyToken, authMW.isAdmin], userController.findAllUsers);


module.exports = route;
