import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * User Schema
 */

const UserSchema = new Schema({
  name: { type: String, required: true },
  preferred_name: { type: String, default: '' }
})

// const validatePresenceOf = value => value && value.length

/**
 * Virtuals
 */

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

UserSchema.path('name').validate(function(name) {
  if (this.skipValidation()) return true
  return name.length
}, 'Name cannot be blank')

/**
 * Query
 */

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

UserSchema.methods = {
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
export default () => User
