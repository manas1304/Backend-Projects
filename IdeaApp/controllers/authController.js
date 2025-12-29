const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

// Logic for the registration or the signup

exports.signUp = async (req, res) =>{

    // Create the user object to be stored in the database.

    const userObj = {

        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
        // Always remember that passwords are never stored as strings as a database as then they would be directly visible
        // So one way encryption is always done using the library of 'bcrypt' from node.js !!!!!!!!
    }

    try{

        const userCreated = await userModel.create(userObj);
        const postRespone = {

            name: userCreated.name,
            email: userCreated.email,
            userId: userCreated.userId,
            password: userCreated.password,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt,
            message: "Registration Successfull"
        }
        res.status(201).send(postRespone)

    }catch(error){

        console.log("Some error occured while adding user to the DB", error.message);
        res.status(500).send({message:"Internal server Error"}); // 500 means internal server error
    }
}