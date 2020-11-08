module.exports = (room) => {
  console.log("Sending the results to everyone\n");
  let results = {};
  let i = 1;
  while (i < room.length) {
    //Begins at position 1 because the position 0 contains room data
    results[i] = room[i].answer;
    i++;
  }
  i = 1;
  while (i < room.length) {
    //Begins at position 1 because the position 0 contains room data
    room[i].player.send(
      JSON.stringify({
        actionToDo: "showResults",
        results: results,
      })
    );
    i++;
  }
};
