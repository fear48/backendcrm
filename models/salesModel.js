import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  desc: { type: String, required: false },
  roomId: { type: String, required: false },
  uid: { type: String, required: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  salePercent: { type: Number, required: true },
  roomName: { type: String, required: true }
})

const Sale = mongoose.model('Sale', SaleSchema, 'sales');
export default Sale;