// Logic for supporting user Related APIs

const usersModels = require("../models/users.models")
const objectConverter = require('../utils/objectConverter')

exports.findAllUsers = async(req, res) =>{

    // Start supporting the query param
    let userTypeReq = req.query.userType;
    let userStatusReq = req.query.userStatus;
    console.log(userTypeReq);
    console.log(userStatusReq);

    const queryObj = {};

    if(userTypeReq){
        queryObj.userType =  userTypeReq
    }

    if(userStatusReq){
        queryObj.userStatus = userStatusReq;
    }


    
    const users = await usersModels.find(queryObj);
    console.log(users);

    return res.status(200).send(objectConverter.userResponse(users));
    
}


// For finding the user based on userId

exports.findById = async(req, res) =>{

    const userId = req.params.userId;

    const user = await usersModels.find({
        userId: userId
    });
    console.log(user);

    if(user && user.length > 0){
        res.status(200).send(objectConverter.userResponse(user));
    }else{
        res.status(400).send({
            message: "User with the given id not present"
        })
    }
}



// Controller to update the user and it's details

exports.update = async(req, res) =>{

    const userReqId = req.params.userId;

    try{

        const user = await usersModels.findOneAndUpdate({userId: userReqId}, {
            userName: req.body.name,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        }).exec();
        res.status(200).send({
            message:"User record has been successfully updated."
        })

    }catch(err){
        console.log("Error while updating the user record", err);
        res.status(400).send({
            message:'Some internal error while updating the record.'
        })
    }
}

// Controller to delete the user
exports.delete = async(req, res) =>{

    const userReqId = req.params.userId;

    try{
        const user = await usersModels.findOneAndDelete({userId: userReqId});

        if(!user){
            return res.status(404).send({
                message: "User with the given ID not found"
            })
        }

        res.status(200).send({
            message: "User Successfully deleted"
        })
        
    }catch(err){
        console.log("Error while deleting the user", err);
        res.status(500).send({
            message: "Internal server error while deleting the user"
        })
    }
}