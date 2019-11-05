import { NotFound, BadRequest, GeneralError } from 'fejl'
import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No user id given')
const assertRequest = NotFound.makeAssert('Request Not Found')

// Prevent overposting.
const pickRequest = data => pick(data, ['title', 'label'])

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
    assertId(id)

    return this.event
      .findById(id)
      .then(doc => {
        return assertRequest(doc)
      })
      .catch(err => {
        this.logger.error(err)
        return assertRequest(null)
      })
  }

  async create(data) {
    BadRequest.assert(this.currentUser.isJoined(), 'No Event Joined!')
    BadRequest.assert(data.title, 'No title given')
    BadRequest.assert(data.title < 50, 'Title is too long')

    return this.request
      .find()
      .activeUserRequests({
        user_id: this.currentUser._id,
        event_id: this.currentUser.event_id
      })
      .then(res => {
        return this.event
          .findById(this.currentUser.event_id)
          .isOktoAddRequest(res)
      })
      .then(res => {
        if (res) {
          return this.request
            .create({
              ...pickRequest(data),
              creator_id: this.currentUser._id,
              event_id: this.currentUser.event_id
            })
            .catch(err => {
              this.logger.error(err)
              return GeneralError.assert(null, 'Request not created.')
            })
        } else {
          return GeneralError.assert(
            null,
            'Reach max number of active request!'
          )
        }
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

    BadRequest.assert(data.title, 'No title given')
    BadRequest.assert(data.title < 50, 'Title is too long')

    // Make sure the user exists by calling `get`.
    let request = await this.get(id)

    return request
      .update(id, pickRequest(data))
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Request not updated')
      })
  }

  // No Remove, mark as cancelled
  async remove(id) {
    let request = await this.get(id)

    return request
      .setCancelled()
      .then(() => {
        return `Request ${id} cancelled`
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'Request not removed')
      })
  }
}
