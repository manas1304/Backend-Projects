const mongoose = require('mongoose');

// Creating the user Schema
// This is basically how the user should look like
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 7
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 10
    },

    userType:{
        type: String,
        enum: ["CUSTOMER", "ADMIN", "ENGINEER"],
        required: true,
        default: "CUSTOMER"
    },

    userStatus:{
        type: String,
        enum: ["APPROVED", "PENDING", "BLOCKED"],
        required: true,
        default: "APPROVED"
    }

}, {timestamps: true})

// Exporting the file so that it can be used in other files as well.
module.exports = mongoose.model('User', userSchema);