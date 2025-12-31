/*
    1. Logic for creating the server.
    2. Make connection with Mongodb.
    3. Creat ADMIN user at server bootime( if doesn't already exist).
    4. Connect to the route layer.
*/

const express = require('express');
const app = express();
require('dotenv').config();

// Starting the server
const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () =>{
    console.log(`Server running at port number: ${PORT}`);
})
