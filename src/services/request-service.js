import { NotFound, BadRequest, GeneralError } from 'fejl'
// import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No user id given')
const assertRequest = NotFound.makeAssert('Request Not Found')

// Prevent overposting.
// const pickProps = data => pick(data, ['name', 'completed'])

/**
 * Event Service.
 * @TODO clean up the event creator verification
 */
export default class RequestService {
  constructor(User, logger, currentUser, Request) {
    this.logger = logger
    this.user = User
    this.currentUser = currentUser
    this.request = Request
  }

  async get(id) {
      return this.request
  }

  

  async create(data) {
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.title, 'No title given')
    BadRequest.assert(data.title < 20, 'Title is too long')
    BadRequest.assert(data.time_created, 'No time given') 
    BadRequest.assert(data.from, 'User not given')
    BadRequest.assert(data.category, 'Category is required')

    return this.request
      .create({
        title: data.title,
        time_created: data.time_created,
        from: data.from,
        category: data.category
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Request not created.')
      })
  }

  /**
   * Adds assistant manually to event
   * Checks if the maker of request is admin of target event, and add assistant id to event
   * @param data
   * @returns {boolean} True if success, False otherwise
   */

  // Update Request
  async update(id, data) {
    assertId(id)

    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.title, 'No title given')
    BadRequest.assert(data.title < 20, 'Title is too long')
    BadRequest.assert(data.time_created, 'No time given')
    BadRequest.assert(data.from, 'User not given')
    BadRequest.assert(data.category, 'Category is required')
    

    // Make sure the user exists by calling `get`.
    let request = await this.get(id)


    // Update event name, assistants, users and lines
    request.title = data.title
    request.time_created = data.time_created
    request.from = data.from
    request.category = data.category
    request.appoint = data.appoint

    return request
      .save()
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Request not updated')
      })
  }

  async remove(id) {
    // Make sure the todo exists by calling `get`.
    let request = await this.get(id)

    return request
      .remove()
      .then(() => {
        return `Request ${id} removed`
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Request not removed')
      })
  }

  /**
   * Adds a request that is already created to the list of an event
   * @TODO How to create new request object to the database??
   * @param {*} id id of Event
   * @param {*} data contains id of request
   */
  /*async addRequest(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload Given')
    BadRequest.assert(data.request_id, 'No request id given')

    let event = await this.get(id)

    return event
      .addRequest(data.request_id)
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Event not updated')
      })
  }*/
}
