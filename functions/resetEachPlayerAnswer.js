module.exports = (room) => {
  console.log("Replacing each player answer");
  let i = 1;
  while (i < room.length) {
    //Begins at position 1 because the position 0 contains room data
    room[i].answer = "This player has not sent any answer";
    i++;
  }
};
