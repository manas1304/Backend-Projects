/**
 * Middle ware to validate the ticketId and content of the comment being created.
 */
const Ticket = require('../models/ticket.model');
exports.validateCommentReqBody = async(req, res, next) =>{

    // Validate if the ticketId is present or not
    if(!req.params.ticketId){
        res.status(400).send({
            message: "Failed! Ticket Id is not present in the path param"
        })
    }

    // Validate if the ticketId is correct or not
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId
    })

    if(!ticket){
        return res.status(400).send({
            message: "Failed to fetch the comment! Wrong Ticket Id passed"
        })
    }

    // Validate if the content inside the comment should not be empty
    if(!req.body.content){
        return res.status(400).send({
            message: "The content of the comment cannot be empty."
        })
    }

    next();
}


exports.validateticketId = async(req, res, next) =>{


    // Validate if the ticketId is correct or not
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId
    })

    if(!ticket){
        return res.status(400).send({
            message: "Failed to fetch the comment! Wrong Ticket Id passed"
        })
    }

    next();
}