const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketServerPort);
console.log('listening to port ' + webSocketServerPort);

const wsServer = new webSocketServer({
   httpServer: server,
});

const clients = {};

// This code generates unique userid for every user.
const getUniqueID = () => {
   const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1);
   return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
   let userID = getUniqueID();
});

// https://www.youtube.com/watch?v=LenNpb5zqGE
// 5.28
