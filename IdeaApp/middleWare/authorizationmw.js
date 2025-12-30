const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    // This function verifies wheather the user is authorized to get the data or not

    // Fetch the token from the header
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message:"No token provided"
        })
    }


    // Check if the token is valid or not
    jwt.verify(token, config.secret, (error, decoded) =>{

        if(error){
            return res.status(401).send({
                message:"You are not authorized."
            })
        }
        next();
    })
    
}


module.exports = {
    verifyToken: verifyToken
}