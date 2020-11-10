const changePlayerToPlayNext = require("./changePlayerToPlayNext");
const sendTheResultsToEveryoneInTheRoom = require("./sendTheResultsToEveryoneInTheRoom");
const resetEachPlayerAnswer = require("./resetEachPlayerAnswer");

module.exports = (room) => {
  if (room[0].hasTheMatchAlreadyStarted === false) {
    if (room.length > 2) {
      console.log("The match has started");
      //That verify if there is more than one player inside the room
      room[room[0].playerToPlayNext].player.send(
        JSON.stringify({
          actionToDo: "askTheQuestion",
        })
      );
      console.log("The question requisition has been sent\n");
      changePlayerToPlayNext(room);
      room[0].interval = setInterval(() => {
        if (room.length > 2) {
          //That verify if still there is more than one player inside the room
          sendTheResultsToEveryoneInTheRoom(room);
          resetEachPlayerAnswer(room);
          room[room[0].playerToPlayNext].player.send(
            JSON.stringify({
              actionToDo: "askTheQuestion",
            })
          );
          changePlayerToPlayNext(room);
        }
      }, 30000);
      room[0].hasTheMatchAlreadyStarted = true;
    }
  }
};

//Don't forget to clear that interval when the room get deleted
