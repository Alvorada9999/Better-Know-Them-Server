module.exports = (room) => {
  if (room[0].playerToPlayNext >= room.length - 1) {
    //That verify if the player that has now been requested to make a question is the last
    //if so the next player is set to 1
    //if not the next player is set to its current value plus 1
    room[0].playerToPlayNext = 1;
  } else {
    room[0].playerToPlayNext = room[0].playerToPlayNext + 1;
  }
};
