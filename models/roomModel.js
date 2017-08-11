const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomModel = new Schema({
  roomName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const Room = mongoose.model("Room", RoomModel, "rooms");
module.exports = Room;
