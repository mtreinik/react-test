# React test: WePaint - a simple collaborative painting app

WePaint is a simple painting application that uses a [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) server to share paint strokes between users. It was created as an experiment on current web application development techniques.

## Architecture

The UI is made with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/).

The WebSocket server is made in JavaScript with [express.js](https://expressjs.com/) and uses the [ws WebSocket library](https://github.com/websockets/ws).

## WebSocket API

JSON messages are used to propagate changes made to the painting. The client sends changes made by the user. The server broadcasts the message to all clients, including the originator.

```
{
  "type":"CHANGES",
  "paintingId":1,
  "pixels":[
    { "x":9, "y":3, "color":"#00ff00" },
    { "x":10, "y":3, "color":"#00ff00" }
  ]
}
```

## Installing, building and deploying

Both WebSocket server and the UI can be run on the same host.

Installing and building:

- npm install
- npm run heroku-postbuild

Deploying to [Heroku](https://www.heroku.com/):

- heroku login
- heroku create
- git push heroku master
