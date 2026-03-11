/**
 * Controller to create a comment
 */
const Comment = require('../models/comments.model');
const socketUtil = require('../utils/socket.util'); // Import socket utility


exports.createComment = async(req, res) =>{

    const commentObj = {
        content: req.body.content,
        ticketId: req.params.ticketId,
        commentorId: req.userId
    }

    try{

        const comment = await Comment.create(commentObj);

        // New Real Time Logic
        // Broadcast the new comment to anyone viewing this ticket
        // This line makes sure the comment data is shown to only those users which are currently viewing the ticket and not to others
        socketUtil.getIO().to(req.params.ticketId).emit('newComment', comment);

        return res.status(201).send(comment);

    }catch(err){
        console.log("Some Error occured while creating the content", err);
        res.status(500).send({
            message:"Some Internal server error"
        })
    }
}

/**
 * Controller to get all the tickets based on ticketId
 */

exports.getTicketsBasedOnId = async(req, res) =>{

    try{
        const comments = await Comment.find({ticketId: req.params.ticketId});
        res.status(200).send(comments);

    }catch(err){
        console.log("Some error occured while fetching the comments", err);
        res.status(400).send({
            message: "Some internal sever error."
        })
    }
}