const constants = require('../utils/constants')

const validateTicketReqBody = (req, res, next) =>{
    
    // Validate the title of the ticket
    if(!req.body.title){
        return res.status(400).send({
            message: "Failed! Title of the ticket is mandatory."
        })
    }

    // Validate the description of the ticket
    if(!req.body.description){
        return res.status(400).send({
            message: "Failed! Description of the ticket is mandatory."
        })
    }

    next();

}


const validateTicketStatus = (req, res, next) =>{
    const status = req.body.status;

    const statusTypes = [constants.ticketStatus.open, constants.ticketStatus.closed, constants.ticketStatus.blocked];

    if(status && !statusTypes.includes(status)){
        return res.status(400).send({
            message: "Status passed is not correct"
        })
    }

    next();
}

module.exports = {
    validateTicketReqBody: validateTicketReqBody,
    validateTicketStatus: validateTicketStatus
}