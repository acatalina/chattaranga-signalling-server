const {ExpressPeerServer} = require('peer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 9000;
const OPTIONS = {
  debug: true
};

const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    process.exit();
  }
  console.log(`Server running on port ${PORT}`);
});

const io = require('socket.io')(server);
const peerServ = ExpressPeerServer(server, OPTIONS);

app.get('/', (req, res) => {
  res.status(200).send({
    STATUS: 'OK', 
    MESSAGE: 'Welcome to Chattaranga Signaling Server',
    PEERJS: '/api',
    'SOCKET.IO': 'emit "connect_to_room" or "disconnect_from_room" with profile {username: username, room: room}' 
  });
});

app.use('/api', peerServ);

io.sockets.on('connection', (socket) => {
  socket.on('connect_to_room', (profile) => {
    socket.join(profile.room);
    io.to(profile.room).emit('USER_CONNECTED', profile.username);
  });
});

io.sockets.on('disconnect', (socket) => {
  socket.on('disconnect_from_room', (profile) => {
    socket.leave(profile.room);
    io.to(profile.room).emit('USER_DISCONNECTED', profile.username);
  });
});

module.exports = server;