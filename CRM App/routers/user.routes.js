const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller')
const authMW = require('../middlewares/authjwt');
const verifyUserReqBody = require('../middlewares/verifyUserReqBody')

route.get("/users", [authMW.verifyToken, authMW.isAdmin], userController.findAllUsers);

route.get("/users/:userId",[authMW.verifyToken, authMW.isAdmin],  userController.findById);

route.put("/users/:userId", [authMW.verifyToken, verifyUserReqBody.validateUserStatusAndType], userController.update )

route.delete("/users/:userId", [authMW.verifyToken, authMW.isAdmin], userController.delete);

module.exports = route;
