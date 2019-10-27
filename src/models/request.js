import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema

/**
 * Request Schema
 */

const RequestSchema = new Schema({
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  appoint: { type: Schema.Types.ObjectId, ref: 'User' }, // What does ref do?
  time_created: { type: Number, required: true }
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

EventSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  //   authenticate: function(plainText) {
  //     return this.encryptPassword(plainText) === this.hashed_password;
  //   },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  //   encryptPassword: function(password) {
  //     if (!password) return '';
  //     try {
  //       return crypto
  //         .createHmac('sha1', this.salt)
  //         .update(password)
  //         .digest('hex');
  //     } catch (err) {
  //       return '';
  //     }
  //   },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function() {
    return true
  }
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

const Request = mongoose.model('Request', RequestSchema)
export default Request
