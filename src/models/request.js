import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Request Schema
 */

const RequestSchema = new Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  appoint: { type: Schema.Types.ObjectId, ref: 'User' }, // What does ref do?
  time_created: { type: Number, required: true }
})

/**
 * Virtuals
 */

RequestSchema.virtual('fromUser', {
  ref: 'User',
  localField: 'from',
  foreignField: '_id',
  justOne: true // Only return one User
})

RequestSchema.virtual('assistantAppointed', {
  ref: 'User',
  localField: 'appoint',
  foreignField: '_id',
  justOne: true // Only return one User
})

const Request = mongoose.model('Request', RequestSchema)
export default Request
