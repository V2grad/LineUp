import mongoose from 'mongoose'
import options from '../mixins/models/options'

const Schema = mongoose.Schema
// const typeOptions = ['created', 'assigned', 'resolved', 'cancelled']
const activeRequest = ['created', 'assigned']

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
    assistant_id: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      required: true
    }
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

RequestSchema.query.activeUserRequests = function({ event_id, user_id }) {
  return this.where({
    event_id,
    creator_id: user_id
  })
    .where('type')
    .in(activeRequest)
}

/**
 * Methods
 */

RequestSchema.methods.setCancelled = function() {
  this.type = 'cancel'
  return this.save()
}

RequestSchema.methods.setResolved = function() {
  this.type = 'resolved'
  return this.save()
}

RequestSchema.methods.setAssistant = function({ user_id }) {
  this.assistant_id = user_id
  this.type = 'assigned'
  return this.save()
}

/**
 * Statics
 */
RequestSchema.statics.activeUserRequestNum = function({ event_id, user_id }) {
  return this.find()
    .activeUserRequests({ event_id, user_id })
    .count()
}

const Request = mongoose.model('Request', RequestSchema)
export default Request
