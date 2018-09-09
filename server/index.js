const path = require('path')
const PORT = process.env.PORT || 5000

const WebSocket = require('ws');
const WEBSOCKET_OPTIONS = { port: PORT };
console.log('starting WebSockets Server with options: ' + JSON.stringify(WEBSOCKET_OPTIONS));
const wss = new WebSocket.Server(WEBSOCKET_OPTIONS);

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log('ws sending' + JSON.stringify(data));
      client.send(data);
    }
  });
};

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
