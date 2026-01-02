// Logic for supporting user Related APIs

const usersModels = require("../models/users.models")
const objectConverter = require('../utils/objectConverter')

exports.findAllUsers = async(req, res) =>{

    const users = await usersModels.find();
    console.log(users);

    return res.status(200).send(objectConverter.userResponse(users));
    
}