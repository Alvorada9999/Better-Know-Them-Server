module.exports = (room) => {
  if (room[0].playerToPlayNext === room.length) {
    room[0].playerToPlayNext === 1;
  } else {
    room[0].playerToPlayNext = room[0].playerToPlayNext + 1;
  }
};
