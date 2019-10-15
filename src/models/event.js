import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * User Schema
 */

const EventSchema = new Schema({
  name: { type: String, required: true },
  eid: { type: String, required: true },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assistants_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

/**
 * Virtuals
 */
EventSchema.virtual('creator', {
  ref: 'User',
  localField: 'creator_id',
  foreignField: '_id',
  justOne: true // Only return one BookType
})

/**
 * Query
 */
EventSchema.query.byName = function(name) {
  return this.where({
    name
  })
}

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

export default () => mongoose.model('Event', EventSchema)