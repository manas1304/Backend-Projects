const express = require('express');
const route = express.Router();
const ticketController = require('../controllers/ticket.controller');
const authMW = require('../middlewares/authjwt');
const commentMw = require('../middlewares/validateCommentReqBody');
const validateTicketReqBody = require('../middlewares/validateTicketReqBody');
const commentController = require('../controllers/comment.controller')

route.post("/tickets", [authMW.verifyToken, validateTicketReqBody.validateTicketReqBody], ticketController.createTicket);

route.put("/tickets/:id", [authMW.verifyToken, validateTicketReqBody.validateTicketStatus], ticketController.updateTicket);

route.get("/tickets", [authMW.verifyToken], ticketController.getAllTickets);

route.get("/tickets/:id", [authMW.verifyToken], ticketController.getTicketBasedOnId);

route.post("/tickets/:ticketId/comments",[authMW.verifyToken, commentMw.validateCommentReqBody], commentController.createComment)


route.get("/tickets/:ticketId/comments",[authMW.verifyToken, commentMw.validateticketId], commentController.getTicketsBasedOnId)

module.exports = route;