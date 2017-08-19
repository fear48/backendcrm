import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventModel = new Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  prepaid: { type: Boolean, default: false, required: true },
  paid: { type: Boolean, default: true, required: true },
  roomId: { type: String, required: true },
  uid: { type: String, required: true },
  sum: { type: Number, required: true },
  eventType: { type: String, required: true },
  members: { type: String, required: true },
  paymentType: { type: Number, required: true },
  comment: { type: String, required: true },
  recall: { type: Boolean, dafault: false },
  createdAt: { type: Date, default: new Date(), required: true }
});

const Event = mongoose.model("Event", EventModel, "events");
export default Event;
