import mongoose from 'mongoose'
import options from '../mixins/models/options'

const Schema = mongoose.Schema

/**
 * Request Schema
 */

const RequestSchemaOptions = options

const RequestSchema = new Schema(
  {
    title: { type: String, required: true },
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    creator_id: { type: Schema.Types.ObjectId, ref: 'User' },
    label: [{ type: String }],
    assistant_id: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  RequestSchemaOptions
)

/**
 * Virtuals
 */

RequestSchema.virtual('creator', {
  ref: 'User',
  localField: 'from',
  foreignField: '_id',
  justOne: true // Only return one User
})

RequestSchema.virtual('assistant', {
  ref: 'User',
  localField: 'assistant_id',
  foreignField: '_id',
  justOne: true // Only return one User
})

RequestSchema.virtual('event', {
  ref: 'Event',
  localField: 'event_id',
  foreignField: '_id',
  justOne: true
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

const Request = mongoose.model('Request', RequestSchema)
export default Request
