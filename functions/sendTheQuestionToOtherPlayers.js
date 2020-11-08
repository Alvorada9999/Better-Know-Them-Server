module.exports = (room, question) => {
  console.log("The question started being sent to the players");
  let i = 1;
  console.log(`Question: ${question}`);
  while (i < room.length) {
    //Begins at position 1 because the position 0 contains room data
    room[i].player.send(
      JSON.stringify({
        actionToDo: "sendTheAnswer",
        question: question,
      })
    );
    i++;
  }
  console.log("The shipment has ended\n");
};
