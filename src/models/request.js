import mongoose from 'mongoose'
import crypto from 'crypto'

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

RequestSchema.virtual('appointAssistant', {
  ref: 'User',
  localField: 'appoint',
  foreignField: '_id',
  justOne: true // Only return one User
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


const Request = mongoose.model('Request', RequestSchema)
export default Request
