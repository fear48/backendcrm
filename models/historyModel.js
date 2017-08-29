import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HistoryModel = new Schema({
  uid: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true }
});

const History = mongoose.model("History", HistoryModel, "history");
export default History;
