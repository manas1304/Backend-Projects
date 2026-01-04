const express = require('express');
const route = express.Router();
const ticketController = require('../controllers/ticket.controller');
const authMW = require('../middlewares/authjwt');
const validateTicketReqBody = require('../middlewares/validateTicketReqBody')

route.post("/tickets", [authMW.verifyToken, validateTicketReqBody.validateTicketReqBody], ticketController.createTicket);

route.put("/tickets/:id", [authMW.verifyToken, validateTicketReqBody.validateTicketStatus], ticketController.updateTicket)

module.exports = route;