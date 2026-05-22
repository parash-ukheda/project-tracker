let io;
const initSocket = (server) => {
    io = require('socket.io')(server,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST","PUT","DELETE","PATCH"]
        }
    });

    return io
};

const getIO = () =>{
    if(!io) {
        throw new ('Socket.io is not initialized')
    };
    return io;
};

module.exports = {
    initSocket,
    getIO
}