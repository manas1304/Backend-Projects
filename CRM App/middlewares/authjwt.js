const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config')
const User = require('../models/users.models');
const constants = require('../utils/constants')

const verifyToken = (req, res, next) =>{

    // Check if the token is present or not 
    const token = req.headers["x-access-token"];
    if(!token){
        res.status(401).send({
            message: "Bad Request! No token passed."
        })
    }

    // Check if the jtw token is correct or not
    jwt.verify(token, config.secret, (err, decoded) =>{
        if(err){
            return res.status(403).send({
                message: "Unauthorized! Wrong or Invalid access token passed"
            })
        }
        req.userId = decoded.id;
    })

    next();
}

// Only admin should be able to see all the users

const isAdmin = async(req, res, next) =>{

    const user = await User.findOne({userId: req.userId});

    if(user && user.userType == constants.userTypes.admin){
        next();
    }else{
        res.status(405).send({
            message: "Only ADMIN is allowed to access this API."
        })
    }
}



module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
