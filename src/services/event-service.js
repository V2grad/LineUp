import { NotFound, BadRequest, GeneralError } from 'fejl'
// import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No event id given')
const assertEvent = NotFound.makeAssert('Event Not Found')

// Prevent overposting.
// const pickProps = data => pick(data, ['name', 'completed'])

/**
 * Event Service.
 * @TODO clean up the event creator verification
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

    return this.event
      .findById(id)
      .then(doc => {
        return assertEvent(doc)
      })
      .catch(err => {
        this.logger.error(err)
        return assertEvent(null)
      })
  }

  async joinUser(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.passcode, 'No passcode given')

    let event = await this.get(id)

    BadRequest.assert(
      event.passcode === data.passcode,
      'User passcode does not match with event passcode!'
    )

    return event
      .addUser(this.currentUser._id)
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Event not updated')
      })
  }

  async joinAssistant(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.passcode, 'No passcode given')

    let event = await this.get(id)

    BadRequest.assert(
      event.admin_code === data.passcode,
      'User admin_code does not match with event admin_code!'
    )
    // add user into users_id

    return event
      .addAssistant(this.currentUser._id)
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Event not updated')
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
        this.currentUser.save()
        return doc
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Event not created.')
      })
  }

  /**
   * Adds assistant manually to event
   * Checks if the maker of request is admin of target event, and add assistant id to event
   * @param data
   * @returns {boolean} True if success, False otherwise
   */
  async addAssistant(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload Given')
    BadRequest.assert(data.user_id, 'No user id given')

    let event = await this.get(id)

    BadRequest.assert(
      this.currentUser.isCreator(event._id),
      'Attempt to add assistant to non-creator event!'
    )

    return event
      .addAssistant(data.user_id)
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Event not updated')
      })
  }

  async update(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.name.length < 20, 'name is too long')

    // Make sure the user exists by calling `get`.
    let event = await this.get(id)

    if (!this.currentUser.isCreator(event._id)) {
      BadRequest.assert(null, 'Attmept to modify non-creator event!')
    }

    // Update event name, assistants, users and lines
    event.name = data.name
    event.lines = data.lines

    return event
      .save()
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Event not updated')
      })
  }

  async remove(id) {
    // Make sure the todo exists by calling `get`.
    let event = await this.get(id)

    if (!this.currentUser.isCreator(event._id)) {
      BadRequest.assert(null, 'Attmept to modify non-creator event!')
    }

    return event
      .remove()
      .then(res => {
        return `User ${id} removed`
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not removed')
      })
  }

  // Methods that handle requests
  // async
}
