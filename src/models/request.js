import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Request Schema
 */

const RequestSchema = new Schema({
  title: {type: String, required: true},
  time_created: { type: Number, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  appoint: { type: Schema.Types.ObjectId, ref: 'User' } // What does ref do?
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

/**
 * Query
 */

RequestSchema.query.byId = function(id) {
  return this.where({
    _id: id
  }).populate('event')
}

/**
 * Validation
 */

RequestSchema.pre('validate', function(next) {
  if (!this.time_created) {
    // Generate a 6 character long passcode for common users
    this.time_created = Date().now
  }
  next()
})

const Request = mongoose.model('Request', RequestSchema)
export default Request
