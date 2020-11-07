module.exports = (rooms, roomName, ws) => {
  rooms[roomName].push({
    player: ws,
    choice: "",
  });
};
