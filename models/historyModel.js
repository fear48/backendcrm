const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HistoryModel = new Schema({
  uid: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  room: {
    type: Number,
    required: true
  }
});

const History = mongoose.model("History", HistoryModel, "history");
module.exports = History;
