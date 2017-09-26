import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ClientSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  comments: { type: [], default: [] },
  email: { type: String },
  social: { type: String }
})

const Client = mongoose.model('Client', ClientSchema, 'clients')
export default Client;
