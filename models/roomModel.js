import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoomModel = new Schema({
  roomName: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true }
});

const Room = mongoose.model("Room", RoomModel, "rooms");
export default Room;
