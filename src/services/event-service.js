import { NotFound, BadRequest, GeneralError } from 'fejl'
// import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No id given')

// Prevent overposting.
// const pickProps = data => pick(data, ['name', 'completed'])

/**
 * Event Service.
 */
export default class EventService {
  constructor(Event, User, logger, currentUser) {
    this.logger = logger
    this.user = User
    this.event = Event
    this.currentUser = currentUser
  }

  async get(id) {
    assertId(id)
    // If `todoStore.get()` returns a falsy value, we throw a
    // NotFound error with the specified message.

    return this.event
      .findById(id)
      .then(doc => {
        return doc
      })
      .catch(err => {
        this.logger.error(err)
        return NotFound.assert(null, `Event with id "${id}" not found`) // We use fuji this way for now
      })
  }

  async create(data) {
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.name.length < 20, 'name is too long')
    BadRequest.assert(data.lines.length > 1, 'Lines is required')

    return this.event
      .create({
        name: data.name,
        lines: data.lines,
        creator: this.currentUser._id
      })
      .then(doc => {
        // Bind user side
        this.currentUser.event_id = doc._id
        return this.currentUser.save()
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not created.')
      })
  }

  async update(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.name.length < 20, 'name is too long')

    // Make sure the user exists by calling `get`.
    let doc = await this.get(id)

    // Update event name, assistants, users and lines
    if (doc) {
      doc.name = data.name
      doc.assistants_id = data.assistants_id
      doc.users = data.users
      doc.lines = data.lines
    }

    return doc
      .save()
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not updated')
      })
  }

  async remove(id) {
    // Make sure the todo exists by calling `get`.
    let doc = await this.get(id)

    return doc
      .remove()
      .then(res => {
        return `User ${id} removed`
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not removed')
      })
  }
}
