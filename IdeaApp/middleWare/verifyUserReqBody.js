const usersModel = require('../models/usersModel');

verifyUserReqBody = async(req, res, next) =>{

    // Validation for the name
    if(!req.body.name){
        res.status(400).send({
            message:"Failed ! Name of the user not provided"
        })
        return
    }

    // Validation for the userId
    if(!req.body.userId){
        res.status(400).send({
            message:"Failed ! userId not provided"
        })
        return
    }

    // Validation for duplicate userId
    const user = await usersModel.findOne({userId: req.body.userId});
    if(user != null){
        res.status(400).send({
            message:"Failed ! userId is duplicate"
        })
        return
    }

    // Validation for the email id
    if(!req.body.email){
        res.status(400).send({
            message:"Failed ! email not provided"
        })
        return
    }

    // Validation for duplicate email id
    const userObj = await usersModel.findOne({email: req.body.email});
    if(userObj != null){
        res.status(400).send({
            message:"Failed ! email already exists........"
        })
    }


    next();
}

module.exports = {
    verifyUserReqBody: verifyUserReqBody
}