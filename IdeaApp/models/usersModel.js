const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    
    userId:{
        type: String,
        required: true,
        unique: true 
    },

    password:{
        type:String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        minLength: 10
    }

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);