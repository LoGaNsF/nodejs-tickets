const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

module.exports.io = socket(server);

require('./sockets/socket');

server.listen(port, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log(`Server running in port ${port}...`);
});
