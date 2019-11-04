import mongoose from 'mongoose'
import options from '../mixins/models/options'

const Schema = mongoose.Schema
// const typeOptions = ['create', 'assigned', 'update', 'cancel']
/**
 * Event Schema
 */

const ChangeSchemaOptions = options

const ChangeSchema = new Schema(
  {
    request_id: {
      type: Schema.Types.ObjectId,
      ref: 'Request',
      required: true
    },
    assigner_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    asignnee_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      required: true
    },
    note: {
      type: String
    }
  },
  ChangeSchemaOptions
)

/**
 * Virtuals
 */
ChangeSchema.virtual('assigner', {
  ref: 'User',
  localField: 'assigner_id',
  foreignField: '_id',
  justOne: true // Only return one User
})

ChangeSchema.virtual('assignee', {
  ref: 'User',
  localField: 'assignee',
  foreignField: '_id',
  justOne: false
})

ChangeSchema.virtual('request', {
  ref: 'Request',
  localField: 'request_id',
  foreignField: '_id',
  justOne: false
})

/**
 * Query
 */
ChangeSchema.query.byRequestId = function(id) {
  return this.where({
    request_id: id
  })
}

ChangeSchema.query.byAssignee = function(id) {
  return this.where({
    assignee_id: id
  })
  // .populate('', '-_id -__v -passcode')
  //  .populate('assistants', '-_id -__v -passcode')
  //  .populate('users', '-_id -__v -passcode')
}

ChangeSchema.query.byAssigner = function(id) {
  return this.where({
    assigneer_id: id
  })
}

/**
 * Methods
 */

/**
 * Statics
 */

ChangeSchema.statics.requestCreated = function({ request_id, creator_id }) {
  return this({
    request_id,
    assigner_id: creator_id,
    type: 'create'
  }).save()
}

ChangeSchema.statics.requestNoteAdded = function({
  request_id,
  assigner_id,
  note
}) {
  return this({
    request_id,
    assigner_id,
    type: 'note',
    note
  }).save()
}

ChangeSchema.statics.requestLabelAdded = function({
  request_id,
  assigner_id,
  labels
}) {
  return this({
    request_id,
    assigner_id,
    type: 'label',
    note: labels
  }).save()
}

ChangeSchema.statics.requestResolved = function({ request_id, assigner_id }) {
  return this({
    request_id,
    assigner_id,
    type: 'resolved'
  }).save()
}

ChangeSchema.statics.requestUpdated = function({ request_id, assigner_id }) {
  return this({
    request_id,
    assigner_id,
    type: 'updated'
  }).save()
}

ChangeSchema.statics.requestCancelled = function({ request_id, assigner_id }) {
  return this({
    request_id,
    assigner_id,
    type: 'cancelled'
  }).save()
}

ChangeSchema.statics.assignAssistant = function({
  request_id,
  assigner_id,
  assignee_id
}) {
  return this({
    request_id,
    assigner_id,
    assignee_id,
    type: 'assigned'
  }).save()
}

const Change = mongoose.model('Change', ChangeSchema)
export default Change
