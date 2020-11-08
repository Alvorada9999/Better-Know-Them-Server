const startTheGame = require("./startTheGame");

module.exports = (rooms, roomName, ws) => {
  rooms[roomName].push({
    player: ws,
    answer: "This player has not sent any answer",
  });
  console.log(`The user has been put inside it's room\n`);
  startTheGame(rooms[roomName]);
};
