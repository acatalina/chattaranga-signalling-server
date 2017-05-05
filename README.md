# Chattaranga signalling server

This project was created to provide a signalling server for the multiplatform desktop app [Chattaranga](https://chattaranga.herokuapp.com) and it has been deployed [here](https://chattaranga-signalling-server.herokuapp.com).

The server involves websockets (through the library Socket.io) to provide the bi-directional communication between clients, webRTC (through the library PeerJS) to provide the video/audio communication between clients and both served over an ExpressJS server.

To run the server locally, just clone this project and run ```npm start``` or if you would like to use it, you can use the deployed version at the provided url.

To be able to connect to the socket.io service, you need to connect to the root endpoint, accepting two different emitters: 'connect_to_room' and 'disconnect_from_room'. Both accepting a profile object containing a username and a room where the client will be connected. The clients will discover each other just if they are connected in the same room.

For the peerJS service, you will need to connect to the endpoint root/api.
