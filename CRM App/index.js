/*
    1. Logic for creating the server.
    2. Make connection with Mongodb.
    3. Create ADMIN user at server bootime( if doesn't already exist).
    4. Connect to the route layer.
*/

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userModel = require('./models/users.models');
const ticketModel = require('./models/ticket.model')
const bcrypt = require('bcryptjs')

/** Wrapping express app with Node.js native http server so that we can add the functionality of socket.io */
const http = require('http');
const socketUtil = require('./utils/socket.util');

// Creating server
const server = http.createServer(app)

// Enabling CORS for all requests -- This is required because frontend and backend will be running on different ports.
// Updating this CORS for deployment so that vercel and render can talk to each other without interruptions.
app.use(cors({
    origin: [
        "http://localhost:3000", // Allowing local development
        "https://manas-crm.vercel.app"// Will be our vercel url ( ex- https://your_app.vercel.app)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// We are sending data in JSON format but express expects data in JavaScript Object so we need to parse the data
app.use(express.json());

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

        // Calling the cleanup function here
            await cleanOrphanTickets()

    }catch(err){
        console.log("Failed to connect to MongoDb", err);
        console.log("Error message", err.message);
    }
}

connectToMongoDb();


// Let's stitch the auth route for signup
const authRoute = require('./routers/auth.routes');
app.use("/crm/api/v1", authRoute);

// Stitching the route to get all users
const userRoute = require('./routers/user.routes');
app.use("/crm/api/v1", userRoute)

// Stitching the route for raising the tickets
const ticketRoute = require('./routers/ticket.routes');
app.use("/crm/api/v1", ticketRoute);


// Stitching the route for notification feature
const notificationRoutes = require('./routers/notification.routes');
app.use("/crm/api/v1", notificationRoutes);

// Deleting the orphan tickets with no userId 
// One time logic to clean up the tickets
async function cleanOrphanTickets() {
    try {
        // 1. Get all valid userId strings from the database
        const validUsers = await userModel.find({}, 'userId');
        const validUserIds = validUsers.map(u => u.userId);

        // 2. Delete tickets where the reporter is NOT in our valid list
        const reporterResult = await ticketModel.deleteMany({
            reporter: { $nin: validUserIds }
        });

        // 3. Delete tickets where an assignee exists but is NOT in our valid list
        // Note: We skip tickets where assignee is null/empty
        const assigneeResult = await ticketModel.deleteMany({
            assignee: { $exists: true, $ne: null, $nin: validUserIds }
        });

        const totalDeleted = reporterResult.deletedCount + assigneeResult.deletedCount;
        
        if (totalDeleted > 0) {
            console.log(`Successfully purged ${totalDeleted} orphan tickets from deleted users.`);
        }
    } catch (err) {
        console.log("Cleanup failed:", err.message);
    }
}

// Initializing socket.io 
const io = socketUtil.init(server);

// Handle Connections and rooms
io.on('connection', (socket) =>{
    console.log("New client connected", socket.id);

    // When a user opens a ticket, they join a room specific to that ticketId
    socket.on('joinTicket', (ticketId) =>{
        socket.join(ticketId);
        console.log(`Socket ${socket.id} joined ticket room: ${ticketId}`);
    })

    // Disconnecting from the socket
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
})


// Starting the server
// Changing app.liste to server.listen for socket.io to work
const PORT = process.env.PORT || 7777;
console.log(PORT);
server.listen(PORT, () =>{
    console.log(`Server running at port number: ${PORT}`);
})
