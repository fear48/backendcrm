const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventModel = new Schema({
  room: { type: String, required: true },
  uid: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: Number, required: true },
  sum: { type: Number, required: true },
  eventType: { type: Number, required: true },
  members: { type: String, required: true },
  paymentType: { type: Number, required: true }
});

const Event = mongoose.model("Event", EventModel, "events");
module.exports = Event;
