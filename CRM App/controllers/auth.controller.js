const bcrypt = require('bcryptjs')
const user = require('../models/users.models')
const constants = require('../utils/constants')
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config');
const {sendWelcomeEmail} = require('../utils/email.util');

/*
    Used for Signup logic
*/

exports.signup = async (req, res) =>{

    // User Status -- If it's the customer or no userStatus provided then it is approved and in other case it is pending
    let userStatus = req.body.userStatus;
    if(!req.body.userType || req.body.userType == constants.userTypes.customer){
        userStatus = constants.userStatus.approved
    }else{
        userStatus = constants.userStatus.pending
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

        // Triggering welcome email feature as soon as the user Object is created
        sendWelcomeEmail(userCreated.email, userCreated.userName);

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


/*
    Used for Signin Logic
*/

exports.signin = async(req, res) =>{
    
    // Check if the userId is present or not.
    const user1 = await user.findOne({userId: req.body.userId});
    // By default the findOne method retrieves all the fields not only the one mentioned............
    if(user1 == null){
        res.status(400).send({
            message:`Bad Request! ${req.body.userId} is not correct.`
        })
        return;
    }

    // Check if the userStatus is approved or not.
    if(user1.userStatus != constants.userStatus.approved){
        res.status(400).send({
            message:`Can't allow the login as the userStatus is not approved. Current Status: ${user.userStatus}`
        })
    }

    // Check if the password is correct or not
    const passwordIsValid = bcrypt.compareSync(req.body.password, user1.password);
    if(!passwordIsValid){
        res.status(401).send({
            message:"You entered incorrect password. Please check the password and try again"
        })
        return;
    }


    // Generate the JWT token and return it.
    const token = jwt.sign({id: user1.userId}, config.secret, {
        expiresIn: 300
    })

    // Return the final response
    res.status(200).send({
        name: user1.name,
        userId: user1.userId,
        userType: user1.userType,
        email: user1.email,
        userStatus: user1.userStatus,
        accessToken: token
    })
    
}


