const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const users = {};

app.use(express.static(path.join(__dirname,'public'))); 

io.on('connection', socket =>{
    socket.on('new-user-joined',name => {
        console.log("new user joined ",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT,() => console.log(`Server running on port ${PORT}`));