const express = require('express')
const path = require('path');
const http = require('http')
const WebSocket = require('ws')
const port = process.env.PORT || 80

const app = express()
app.use(express.static(path.resolve(__dirname, '../react-ui/app')));
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/app', 'index.html'));
});

const httpServer = http.createServer(app)

const wss = new WebSocket.Server({
    'server': httpServer
})

//TODO is this needed?
/*
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log('ws sending' + JSON.stringify(data));
      client.send(data);
    }
  });
};
*/

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      console.log('ws broadcasting' + JSON.stringify(data));
      //      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
	//}
    });
  });
});

httpServer.listen(port)
