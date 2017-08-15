import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionModel = new Schema({
  uid: { type: String, required: true },
  date: { type: String, required: true },
  sum: { type: Number, required: true },
  type: { type: Number, required: true },
  categoty: { type: String, required: true }
});

const Transaction = mongoose.model(
  "Transaction",
  TransactionModel,
  "transactions"
);
export default Transaction;
