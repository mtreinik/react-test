const path = require('path');
const express = require('express');
const http = require('http');
const WS = require('ws');
import { Request, Response } from 'express';

const port = process.env.PORT || 80;

// A HTTP server with routing through express
const app = express();
app.use(express.static(path.resolve(__dirname, '../react-ui/app')));
app.get('*', (request:Request, response:Response) => {
    response.sendFile(path.resolve(__dirname, '../react-ui/app', 'index.html'));
});
const httpServer = http.createServer(app);

// A WebSocket server on top of the HTTP server
const wss = new WS.Server({
    'server': httpServer
});
wss.on('connection', (ws:any) => {
  ws.on('message', (data:string) => {
    wss.clients.forEach((client:any) => {
      console.log('ws broadcasting' + JSON.stringify(data));
      client.send(data);
    });
  });
});

// Start listening
httpServer.listen(port);
