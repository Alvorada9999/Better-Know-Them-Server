const startTheGame = require("./startTheGame");

module.exports = (rooms, roomName, ws) => {
  rooms[roomName].push({
    player: ws,
    choice: "",
  });
  startTheGame(rooms[roomName]);
};
