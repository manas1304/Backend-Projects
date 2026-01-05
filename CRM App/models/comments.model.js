const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },

    ticketId:{
        type: mongoose.SchemaType.ObjectId,
        ref: "Ticket",
        required: true
    },

    commenterId:{
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model("Comment", commentSchema);