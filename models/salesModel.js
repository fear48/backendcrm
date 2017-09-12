import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  desc: { type: Number, required: true },
  roomId: { type: String, required: false },
  uid: { type: String, required: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
})

const Sale = mongoose.model('Sale', SaleSchema, 'sales');
export default Sale;