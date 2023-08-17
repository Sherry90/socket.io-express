require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('input chat message', (msg) => {
        io.emit('output chat message', msg);
    });
});

server.listen(port, () => {
    console.log('listening on *:3000');
});
