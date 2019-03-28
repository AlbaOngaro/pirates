const express = require('express');
const socket = require('socket.io');

// setup the express app
let app = express();
let server = app.listen(4000);

// setup socket io backend
let io = socket(server);

// awaits for socket connections and does something
io.on('connection', (socket) => {
    // handles the chat evend fired from frontend
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    // handles the typing event fired from frontend
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});