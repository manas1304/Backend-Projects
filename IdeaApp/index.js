// Server File -- This is the Starting point of the App
const express = require('express');
const app = express();
const PORT = 8080;

// Install and use mongoose and dotenv file
const mongoose= require('mongoose');
require('dotenv').config();


// Making the conection with MongoDB -- return promises objects
async function connectMongoDB(){

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection is successful");

    }catch(err){
        console.log("MongoDB error", err)
    }

}
connectMongoDB();




/*
    The error for the post request came because the Data that we were sending from POSTMAN(client) was in JSON format but
    Node.js understands data only in JS object. So, the necessary conversion is required
*/
app.use(express.json()); // Converts the JSON format to JS Object

// Bring the Morgan into use
const morgan = require('morgan');
app.use(morgan('dev'));

const ideaRoute = require("./routers/ideasRouters");
app.use("/ideas_app/v1", ideaRoute);

// Stitching the authorization router
const authRoute = require("./routers/authRouter");
app.use("/ideas_app/v1", authRoute);


// Starting the server

app.listen(PORT, () =>{

    console.log(`Server running on the Port Number ${PORT}`);

})

