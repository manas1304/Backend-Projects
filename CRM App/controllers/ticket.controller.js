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
            return res.status(201).send({ticket})
        } return;

    }catch(err){
        console.log("Error while creating the ticket", err);
        res.status(500).send({
            message: "Some internal server error"
        })
    }

}


/**
 * Controller for Updating the tickets
 */


exports.updateTicket = async(req, res) =>{

    try{

        const ticket = await Ticket.findOne({_id: req.params.id});

        // Which user is making the call
        const callingUserDetails = await User.findOne({
            userId: req.userId
        })

        // I want to check if the right user is trying to update the ticket
        /**
         * Calling user is the filer of the ticket
         * Engineer
         * Admin
         */

        if((ticket.reporter == req.userId) || (callingUserDetails.userType == constants.userTypes.engineer)
            || (callingUserDetails.userType == constants.userTypes.admin)
        ){
            ticket.title = req.body.title != undefined ? req.body.title: ticket.title
            ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority: ticket.ticketPriority,
            ticket.description = req.body.description != undefined ? req.body.description: ticket.description,
            ticket.status = req.body.status != undefined ? req.body.status: ticket.titstatus,
            ticket.reporter = req.body.reporter != undefined ? req.body.reporter: ticket.reporter,
            ticket.assignee = req.body.assignee != undefined ? req.body.assignee: ticket.assignee

            const updatedTicket = await ticket.save();
            res.status(200).send(updatedTicket);

        }else{
            res.status(400).send({
                message:"Ticket can only be updated by owner, engineer or admin"
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).send({message: "Internal Server Error"})
    }
}


/**
 * Fetching all the tickets:
 * 1. Customers - he/she should fetch only their tickets.
 * 2. Engineers - he/she should fetch only the tickets assigned to them or created them.
 * 3. ADMIN -- should be able to view all the tickets
 */

exports.getAllTickets = async (req, res) =>{

    /**
     * Fetch the user Object which is making the request
     */
    const savedUser = await User.findOne({
        userId: req.userId
    })

    const queryObj = {};
    

    if(savedUser.userType == constants.userTypes.customer){
        // Only return the tickets filed by this customer
        queryObj.reporter = savedUser.userId;
    }else if(savedUser.userType == constants.userTypes.engineer){
        // Only return the tickets filed or created by engineer
        queryObj.assignee = savedUser.userId;
    }else{
        // Return all the tickets
    }

    const tickets = await Ticket.find(queryObj);
    return res.status(200).send(tickets);

}

/**
 * Fetch the ticket based on Id
 */

exports.getTicketBasedOnId = async(req, res)=>{
    
    const ticket = await Ticket.findOne({
        _id: req.params.id
    })

    const savedUser = await User.findOne({
        userId: req.userId
    })

    if(savedUser.userType == constants.userTypes.admin
        || savedUser.userType == constants.userTypes.engineer || ticket.reporter == req.userId
    ){
        return res.status(200).send(ticket);
    }else{
        return res.status(400).send({
            message: "Can't fetch ticket as you are not authorized"
        })
    }
    
}