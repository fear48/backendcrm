const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logModel = new Schema({
  uid: { type: String, required: true },
  actionType: { type: String, required: true },
  date: { type: Date, required: true }
});

const Log = mongoose.model("Log", logModel, "logs");
module.exports = Log;
