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
    ENDPOINTS: '/api to PeerServer'
  });
});

app.use('/api', peerServ);

peerServ.on('connection', (id) => {
  io.emit('USER_CONNECTED', id);
});

peerServ.on('disconnect', (id) => {
  io.emit('USER_DISCONNECTED', id);
});

module.exports = server;