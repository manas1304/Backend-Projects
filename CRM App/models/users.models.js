const mongoose = require('mongoose');
const constants = require('../utils/constants');
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
        enum: [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin],
        required: true,
        default: constants.userTypes.customer
    },

    userStatus:{
        type: String,
        enum: [constants.userStatus.approved, constants.userStatus.blocked, constants.userStatus.pending],
        required: true,
        default: constants.userStatus.approved
    }

}, {timestamps: true})

// Exporting the file so that it can be used in other files as well.
module.exports = mongoose.model('User', userSchema);