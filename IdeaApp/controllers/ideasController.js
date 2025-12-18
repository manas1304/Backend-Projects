const ideas = require('../models/ideasModel');

let id = 4; // initial last id number of the idea stored

/*
    Controller to fetch all the ideas present in the system
*/

exports.getAllIdeas = (req, res) =>{

    // We will have to read the data from the ideasModel.js file
    res.status(200).send(ideas);

}

/*
    Controller to fetch the idea based on idea id
*/

exports.getIdeaBasedOnId = (req, res) =>{

    const ideaId = req.params.id;

    if(ideas[ideaId]){

        res.status(200).send(ideas[ideaId]);

    }

    else{

        console.log(`Idea with the Id ${ideaId} is not present`);
        res.status(404).send({
            message:`Idea with the Id ${ideaId} is not present`
        });

    }

}


/*
    Controller to create a new Idea
*/

exports.createIdea = (req, res) =>{

    // Logic to create a new idea
    id++;

    // Read the request body
    let ideaObject = req.body;
    console.log(ideaObject)
    ideaObject["id"] = id;
    ideas[id] = ideaObject

    // Return the respone
    res.status(201).send(ideaObject)
}


/*
    Controller to update an Existing Idea
*/

exports.updateIdea = (req, res) =>{
    
    // Read the idea
    const ideaId = req.params.id;

    // Check if the idea exists or not
    if(ideas[ideaId]){

        const ideaObject = req.body;
        ideas[ideaId] = ideaObject;
        res.status(202).send(ideaObject)

    }

    else{

        res.status(404).send("Idea with the following id doesn't exist")
    }
}

exports.deleteIdea = (req, res) =>{

    // Fetch the idea by Id
    const ideaId = req.params.id;

    if(ideas[ideaId]){

        delete ideas[ideaId];
        res.status(200).send({
            message: `Idea with the id ${ideaId} is deleted successfully.`
        })

    }

    else{

        res.status(404).send("Idea with the following id doesn't exist");

    }

}