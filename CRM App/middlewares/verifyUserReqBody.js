const Users = require('../models/users.models')
const constants = require('../utils/constants')

// Logic for validating the user Input
verifyUserReqBody = async(req, res, next) =>{

    // Validate if the name of the user is present or not
    if(!req.body.name){
        res.status(400).send({
            message:"Bad Request! Name of the user is not provided."
        })
        return;
    }

    // Validate if the password of the user is present or not
    if(!req.body.password){
        res.status(400).send({
            message:"Bad Request! password of the user is not provided."
        })
        return;
    }

    // Validate if the email of the user is present or not
    if(!req.body.email){
        res.status(400).send({
            message:"Bad Request! Email of the user is not provided."
        })
        return;
    }

    // Validate if the email provided is unique or not
    const user = await Users.findOne({email: req.body.email});
    if(user != null){
        res.status(400).send({
            message:"Bad Request! email already exists."
        })
        return;
    }

    // Validate if the userId of the user is present or not
    if(!req.body.userId){
        res.status(400).send({
            message:"Bad Request! userId of the user is not provided."
        })
        return;
    }

    // Validate if the userId provided is unique or not
    const user1 = await Users.findOne({userId: req.body.userId});
    if(user1 != null){
        res.status(400).send({
            message:"Bad Request! userId already exists."
        })
        return;
    }

    // Validating the userType
    const possibleUserTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin];
    if(req.body.userType && !possibleUserTypes.includes(req.body.userType)){
        res.status(400).send({
            message:"Bad Request! This userType doesn't exist. Please change the userType and try again."
        })
        return;
    }


    next();
}


// Validate the userStatus and userType while updating the user details

const validateUserStatusAndType = (req, res, next) =>{
    
    // Validate userType
    const userType = req.body.userType;
    const possibleUserTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin];

    if(userType && !possibleUserTypes.includes(userType)){
        res.status(400).send({
            message: "Invalid userType provided. Possible values are CUSTOMER | ENGINEER | ADMIN"
        })
        return
    }

    // Validate userStatus
    const userStatus = req.body.userStatus;
    const userStatuses = [constants.userStatus.approved, constants.userStatus.blocked, constants.userStatus.pending];

    if(userStatus && !userStatuses.includes(userStatus)){
        res.status(400).send({
            message: "Invalid userStatus provided. Possible values are APPROVED | PENDING | BLOCKED"
        })
        return
    }

    next();
    
}


module.exports = {
    verifyUserReqBody: verifyUserReqBody,
    validateUserStatusAndType: validateUserStatusAndType
}