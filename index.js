require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('node:path')
const nodemailer = require("nodemailer");
const { dataBaseConnect } = require('./db/db-connection');
const user_routes = require('./routes/user-routes');
const auth_routes = require('./routes/auth-routes');
const project_routes = require('./routes/project-routes');
const task_routes = require('./routes/task-routes');
const comment_routes = require('./routes/comment-routes');
const document_routes = require('./routes/document-routes');
const { EmailSendFun } = require('./middleware/node-mailer');
const { Server } = require('socket.io');
const http = require('http');
const Project = require('./schema/project-schema');
const {initSocket} = require('./middleware/socket');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const io = initSocket(server) 
const mainRoot = "/app/"
// Database
const mongourl = process.env.MONGO_URL;
dataBaseConnect(mongourl);

// socket
io.on('connection',(socket) => {
    console.log('User connected',socket.id);
    socket.on('disconnect',() => {
        console.log('User disconnected')
    })
})

// middleware
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/upload', express.static(path.join(__dirname , 'upload')));

// routes
app.use('/api/auth/',auth_routes);
app.use('/api/user/',user_routes);
app.use('/api/project/',project_routes);
app.use('/api/task/',task_routes);
app.use('/api/comment/',comment_routes);
app.use('/api/document/',document_routes)

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening at port : ${port}`)
})

module.exports = io;