/**
 * Define the controller to create a new ticket
 * 
 * As soon as the ticket is created it should be auto assigned to an Engineer
 * if available
 */

const User = require('../models/users.models');
const constants = require('../utils/constants');
const Ticket = require('../models/ticket.model')


exports.createTicket = async(req, res) =>{
     
    // Read the ticket request body
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId // This will be set at the MW layer, during auth.
    }

    
    // Create the ticket and auto assign to the Engineer if available

    // Firstly I need to find an Engineer which is in approved state.

    const engineer = await User.findOne({
        userType: constants.userTypes.engineer,
        userStatus: constants.userStatus.approved
    })
    console.log(engineer);

    if(engineer){
        ticketObj.assignee = engineer.userId
    }

    try{
        // Creating the ticket
        const ticket = await Ticket.create(ticketObj);
        if(ticket){
            return res.status(201).send({
                title: ticket.title,
                ticketPriority: ticket.ticketPriority,
                description: ticket.description,
                status: ticket.status,
                reporter: ticket.reporter,
                assignee: ticket.assignee
            })
        } return;

    }catch(err){
        console.log("Error while creating the ticket", err);
        res.status(500).send({
            message: "Some internal server error"
        })
    }

}