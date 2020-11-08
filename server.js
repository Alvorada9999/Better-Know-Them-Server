const http = require("http");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const webSocketModule = require("ws");
const url = require("url");

const app = express();
const server = http.createServer(app);
const wsServer = new webSocketModule.Server({ noServer: true });

const putUserInsideTheRoom = require("./functions/putUserInsideTheRoom");
const sendTheQuestionToOtherPlayers = require("./functions/sendTheQuestionToOtherPlayers");
const storeTheAnswerThatHasArrived = require("./functions/storeTheAnswerThatHasArrived");
const removePlayerFromTheRoom = require("./functions/removePlayerFromTheRoom");

let rooms = {
  room: [
    {
      playerToPlayNext: 1,
      hasTheMatchAlreadyStarted: false,
    },
  ],
};

/*app.use((req, res) => {
  //Don't foget to send the home page if the user tries to enter some page that does note exists
  res.status("404: Page not Found", 404);
});*/

app.use(cors());

app.get("/room/create/:roomName", (req, res) => {
  if (rooms[req.params.roomName]) {
    res.json({ isRoom: "yes" });
    res.end();
  } else {
    res.json({ isRoom: "no" });
    rooms[req.params.roomName] = [
      {
        playerToPlayNext: 1,
        hasTheMatchAlreadyStarted: false,
      },
    ];
    res.end();
  }
});

app.get("/room/enter/:roomName", (req, res) => {
  if (rooms[req.params.roomName]) {
    res.json({ isRoom: "yes" });
    res.end();
  } else {
    res.json({ isRoom: "no" });
    res.end();
  }
});

//Sockets logic above

server.on("upgrade", function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === "/socket") {
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
      wsServer.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

wsServer.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    const jsonMessage = JSON.parse(message);

    if (jsonMessage.actionToDo === "enterRoom") {
      console.log("One user has arrived");
      putUserInsideTheRoom(rooms, jsonMessage.roomName, ws);
    } else if (jsonMessage.actionToDo === "sendTheQuestionToOtherPlayers") {
      console.log("The question has arrived\n");
      sendTheQuestionToOtherPlayers(
        rooms[jsonMessage.roomName],
        jsonMessage.questionFromInquisitor
      );
    } else if (jsonMessage.actionToDo === "storeMyAnswer") {
      console.log("One player answer has arrived");
      storeTheAnswerThatHasArrived(
        rooms[jsonMessage.roomName],
        jsonMessage.answer,
        ws
      );
    }
    ws.on("close", () => {
      //It runs twice because the protocol
      //This event needs to be inside the on message event because it needs the room name to remove the player
      removePlayerFromTheRoom(rooms[jsonMessage.roomName], ws);
    });
  });
});

//Server ignition above

server.listen(8000, () => {
  console.log("Server running on port 8000\n");
});
