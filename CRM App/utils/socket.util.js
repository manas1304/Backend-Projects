/**
 * To use the socket instance across different controllers, I create a singleton wrapper.
 */

let io;

module.exports = {
    init: function(httpServer){
        const {Server} = require('socket.io');
        io = new Server(httpServer, {
            cors: {
                origin: '*',
                method: ['GET', 'POST']
            }
        });
        return io;
    },

    getIO: function(){
        if(!io){
            throw new Error("Socket.io is not initialized")
        }
        return io;
    }

}

