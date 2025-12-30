const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

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


// Logic for signin

exports.signin = async(req, res) =>{

    // Check if the user exists by comparing the userId
    const user = await userModel.findOne({userId: req.body.userId});
    console.log(user);
    if(user == null){
        res.status(400).send({
            message:"Failed ! User Id doesn't exist"
        })
        return
    }

    // Check if the password matches
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if(!passwordIsValid){
        res.status(400).send({
            message:"Failed ! Incorrect Password."
        })
    }

    // Return the JW Token
    const token = jwt.sign({id: user.userId}, config.secret, {expiresIn: 60});
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        accessToken: token
    })
}