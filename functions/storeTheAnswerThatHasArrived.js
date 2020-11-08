module.exports = (room, answer, ws) => {
  console.log("One player answer is being stored");
  let i = 1;
  while (i <= room.length - 1) {
    //Begins at position 1 because the position 0 contains room data
    if (room[i].player === ws) {
      room[i].answer = answer;
      break;
    }
    i++;
  }
  console.log("One player answer has been stored\n");
};
