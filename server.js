const http = require('http');
const express = require('express');
const app = express();

const cors = require('cors');
const fs = require('fs');

const clients = new Set();

let rooms = {
  room: "1"
};

app.use(cors());

app.get('/room/create/:roomId', (req, res) => {
  if(rooms[req.params.roomId]) {
    res.json({isRoom: 'yes'});
    res.end();
  } else {
    res.json({isRoom: 'no'});
    rooms[req.params.roomId] = [0];
    res.end();
  }
})

app.get('/room/enter/:roomId', (req, res) => {
  if(rooms[req.params.roomId]) {
    res.json({isRoom: 'yes'});
    res.end();
  } else {
    res.json({isRoom: 'no'});
    res.end();
  }
})

app.listen(8000, () => {
  console.log('Express server running on port 8000\n');
});

const webSocketModule = require('ws');
const wsServer = new webSocketModule.Server({ port: 9000 });

wsServer.on('connection', (ws, req) => {

  ws.on('message', (message) => {
    if(rooms[JSON.parse(message).type] === 'enterRoom') {
      //rooms[JSON.parse(message).roomName] = 
    }
  })
})