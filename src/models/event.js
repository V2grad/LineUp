import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema

/**
 * Event Schema
 */

const EventSchema = new Schema({
  name: { type: String, required: true },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assistants_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  users_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lines: [{ type: String, required: true }],
  requests_id: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  passcode: { type: String, required: true },
  admin_code: { type: String, required: true },
  active_request_per_user: { type: Number, default: 1 }
})

/**
 * Virtuals
 */
EventSchema.virtual('creator', {
  ref: 'User',
  localField: 'creator_id',
  foreignField: '_id',
  justOne: true // Only return one User
})

EventSchema.virtual('users', {
  ref: 'User',
  localField: 'users_id',
  foreignField: '_id',
  justOne: false
})

EventSchema.virtual('assistants', {
  ref: 'User',
  localField: 'assistants_id',
  foreignField: '_id',
  justOne: false
})

EventSchema.virtual('requests', {
  ref: 'Request',
  localField: 'requests_id',
  foreignField: '_id',
  justOne: false
})

/**
 * Query
 */
EventSchema.query.byName = function(name) {
  return this.where({
    name
  })
}

EventSchema.query.byId = function(id) {
  return this.where({
    _id: id
  }).populate('creator', '-_id -__v -passcode')
  //  .populate('assistants', '-_id -__v -passcode')
  //  .populate('users', '-_id -__v -passcode')
}

/**
 * Create PassCode for common users
 */
EventSchema.pre('validate', function(next) {
  if (!this.passcode) {
    // Generate a 6 character long passcode for common users
    this.passcode = crypto.randomBytes(3).toString('hex')
  }
  if (!this.admin_code) {
    // Generate a 6 character long passcode for assistants
    this.admin_code = crypto.randomBytes(3).toString('hex')
  }
  next()
})

// UserSchema.virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

/**
 * Pre-save hook
 */

// UserSchema.pre('save', function(next) {
//   if (!this.isNew) return next();

//   if (!validatePresenceOf(this.password) && !this.skipValidation()) {
//     next(new Error('Invalid password'));
//   } else {
//     next();
//   }
// });

/**
 * Methods
 */

EventSchema.methods.isCreator = function(id) {
  if (typeof id === 'string') {
    return this.creator_id.toString() === id
  }

  return this.creator_id.equals(id)
}

EventSchema.methods.isUserExist = function(id) {
  return this.users_id.indexOf(id) !== -1
}

EventSchema.methods.addUser = function(id) {
  if (this.users_id.indexOf(id) === -1) {
    this.users_id.push(id)
    return this.save()
  }
  return Promise.reject(new Error('User has already joined event'))
}

EventSchema.methods.addAssistent = function(id) {
  this.assistants_id.push(id)
  return this.save()
}

EventSchema.methods.addRequest = function(id) {
  this.requests_id.push(id)
  return this.save()
}

EventSchema.methods.isOkToAddRequest = function(num) {
  if (this.active_request_per_user === -1) {
    return true
  }

  return num <= this.active_request_per_user
}

/**
 * Statics
 */

// EventSchema.statics = {
//   /**
//    * Load
//    *
//    * @param {Object} options
//    * @api private
//    */

//   load: async function(options) {
//     options.select = options.select || 'name';
//     return this.findOne(options.criteria)
//       .select(options.select)
//   }
// }

const Event = mongoose.model('Event', EventSchema)
export default Event
