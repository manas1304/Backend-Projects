const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideasController');
const ideasMiddlewware = require("../middleWare/ideasMiddleware");
const authMW = require('../middleWare/authorizationmw')

/*
    Start defining routes
*/

// Route for fetching all ideas -- 127.0.0.1:8080/ideas_app/v1/ideas

router.get("/ideas",[authMW.verifyToken], ideaController.getAllIdeas);

/*
    Route for Fetching Ideas based on Id
*/

router.get("/ideas/:id", ideaController.getIdeaBasedOnId);

/*
    Route for creating a new Idea
*/

router.post("/ideas", ideasMiddlewware.validatePOSTReqBody, ideaController.createIdea)

/*
    Route for updating the existing idea
*/

router.put("/ideas/:id", ideasMiddlewware.validatePUTReqBody, ideaController.updateIdea)

/*
    Route for deleting the idea
*/

router.delete("/ideas/:id", ideaController.deleteIdea)

module.exports = router;