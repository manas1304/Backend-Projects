const mongoose = require('mongoose');
const constants = require('../utils/constants')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    ticketPriority: {
        type: Number,
        required: true,
        default: 4
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: constants.ticketStatus.open
    },

    reporter: {         // Will be using the userId of the user to know who reported the ticket
        type: String,
        required: true
    },

    assignee : {        // Will be using the userId of the engineer to know who is being assigned with the ticket
        type: String,
   
    }
}, {timestamps: true})


module.exports = mongoose.model('Ticket', ticketSchema);