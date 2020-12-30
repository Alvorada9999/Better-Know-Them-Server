module.exports = (room, ws) => {
  let i = 1;
  if (room != undefined) {
    while (i <= room.length - 1) {
      //Begins at position 1 because the position 0 contains room data
      if (room[i].player === ws) {
        console.log("One player is being removed from the room");
        console.log("Room before the player removal:");
        console.log(room);
        room.splice(i, 1);
        console.log("One player has been removed from the room");
        console.log("Room after the player removal:");
        console.log(room);
        break;
      }
      i++;
    }
  }
};
