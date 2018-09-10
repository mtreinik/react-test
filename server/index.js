const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 80;

// A HTTP server with routing through express
const app = express();
app.use(express.static(path.resolve(__dirname, '../react-ui/app')));
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../react-ui/app', 'index.html'));
});
const httpServer = http.createServer(app);

// A WebSocket server on top of the HTTP server
const wss = new WebSocket.Server({
    'server': httpServer
});
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      console.log('ws broadcasting' + JSON.stringify(data));
      client.send(data);
    });
  });
});

// Start listening
httpServer.listen(port);
