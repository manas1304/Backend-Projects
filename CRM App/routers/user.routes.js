const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller')
const authMW = require('../middlewares/authjwt');

route.get("/users", [authMW.verifyToken, authMW.isAdmin], userController.findAllUsers);

route.get("/users/:userId",[authMW.verifyToken, authMW.isAdmin],  userController.findById);

route.put("/users/:userId", [authMW.verifyToken, authMW.isAdmin], userController.update )


module.exports = route;
