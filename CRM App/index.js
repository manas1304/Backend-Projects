/*
    1. Logic for creating the server.
    2. Make connection with Mongodb.
    3. Creat ADMIN user at server bootime( if doesn't already exist).
    4. Connect to the route layer.
*/

const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userModel = require('./models/users.models');
const bcrypt = require('bcryptjs')

// Making the connection with the MongoDb

async function connectToMongoDb(){

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo Connected");

        const user = await userModel.findOne({
            userId: "admin"
        })

        if(!user){
            console.log("Admin is not already present");

            // Creating a new admin object
            const admin = await userModel.create({
                name:"Manas",
                userId: "admin",
                email:"manasadmin@gmail.com",
                userType: "ADMIN",
                password: bcrypt.hashSync('admin1', 8)
            });

            console.log("Admin Created", admin);

            const verifyAdmin = await userModel.findOne({userId: "admin"});
            console.log("Verification - Admin found", verifyAdmin);
        }
        else{
            console.log("Admin already present", user);
        }

    }catch(err){
        console.log("Failed to connect to MongoDb", err);
        console.log("Error message", err.message);
    }
}

connectToMongoDb();


// Starting the server
const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () =>{
    console.log(`Server running at port number: ${PORT}`);
})
