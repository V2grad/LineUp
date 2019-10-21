import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema

/**
 * User Schema
 */

const UserSchema = new Schema({
  name: { type: String, required: true },
  passcode: { type: String, required: true },
  preferred_name: { type: String, default: '' },
  event_id: { type: Schema.Types.ObjectId, ref: 'Event' }
})

/**
 * User Query
 */

UserSchema.query.validateUser = function({ id, code }) {
  return this.where({
    _id: id,
    passcode: code
  }).findOne()
}

/**
 * Virtuals
 */

UserSchema.virtual('event', {
  ref: 'Event',
  localField: 'event_id',
  foreignField: '_id',
  justOne: true // Only return one Event
})

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

// UserSchema.path('passcode').validate(function(name) {
//   if (this.skipValidation()) return true
//   return name.length
// }, 'Name cannot be blank')

/**
 * Query
 */

UserSchema.query.byId = function(id) {
  return this.where({
    _id: id
  })
    .populate('event')
    .select('-_id, -__v, -passcode')
}

/**
 * Pre-save hook
 */

UserSchema.pre('validate', function(next) {
  if (!this.isNew) return next()

  if (!this.passcode) {
    this.passcode = crypto.randomBytes(20).toString('hex')
  }

  next()
})

/**
 * Methods
 */

UserSchema.methods = {
  isJoined: function() {
    return this.event_id !== null
  },
  isCreator: function(id) {
    if (typeof id === 'string') {
      return this.event_id.toString() === id
    }

    return this.event_id.equals(id)
  },
  skipValidation: function() {
    return true
  }
}

/**
 * Statics
 */

UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @api private
   */

  load: async function(options) {
    options.select = options.select || 'name'
    return this.findOne(options.criteria).select(options.select)
  }
}

const User = mongoose.model('User', UserSchema)
export default User
