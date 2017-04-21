const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    process.exit();
  }
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).send({
    STATUS: 'OK', 
    MESSAGE: 'Welcome to Chattaranga Signaling Server',
    ENDPOINTS: '/api to PeerServer'
  });
});

module.exports = server;