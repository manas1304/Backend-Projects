const bcrypt = require('bcryptjs');
const user = require('../models/users.models')


/*
    Used for Signup logic
*/

exports.signup = async (req, res) =>{

    // User Status -- If it's the customer or no userStatus provided then it is approved and in other case it is pending
    let userStatus = req.body.userStatus;
    if(!req.body.userType || req.body.userType == "CUSTOMER"){
        userStatus = "APPROVED"
    }else{
        userStatus = "PENDING"
    }

    // To store user in Database
    // The raw data that the user sends by signing up.....................

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: req.body.userType,
        userStatus: userStatus
    }

    try{

        const userCreated = await user.create(userObj);
        const postRes = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt

        }
        res.status(201).send(postRes)
        console.log(postRes); // Since i don't want the _id and _v - meta information inside the object so i am returning an object of my choice

    }catch(err){
        console.log("Error while creating user", err);
        res.status(500).send({
            message: "Some internal error occured while creating the user"
        })
    }
}