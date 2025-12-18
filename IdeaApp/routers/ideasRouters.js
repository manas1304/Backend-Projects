const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideasController');

/*
    Start defining routes
*/

// Route for fetching all ideas -- 127.0.0.1:8080/ideas_app/v1/ideas

router.get("/ideas", ideaController.getAllIdeas);

/*
    Route for Fetching Ideas based on Id
*/

router.get("/ideas/:id", ideaController.getIdeaBasedOnId);

/*
    Route for creating a new Idea
*/

router.post("/ideas", ideaController.createIdea)

/*
    Route for updating the existing idea
*/

router.put("/ideas/:id", ideaController.updateIdea)

/*
    Route for deleting the idea
*/

router.delete("/ideas/:id", ideaController.deleteIdea)

module.exports = router;