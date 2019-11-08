import { BadRequest, GeneralError } from 'fejl'

// Prevent overposting.
// const pickProps = data => pick(data, ['name', 'completed'])

/**
 * Todo Service.
 * Gets a todo store injected.
 */
export default class UserService {
  constructor(User, logger, currentUser) {
    this.logger = logger
    this.user = User
    this.currentUser = currentUser
  }

  async get() {
    return this.currentUser
  }
  
  // Returns a certain user
  async viewUser(id) {
    assertId(id)

    let user = await this.get()

    return user
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(
          null,
          'For some reason fetching passcode failed.'
        )
      })
  }
  

  async update(data) {
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.name.length < 20, 'name is too long')

    // Update
    this.currentUser.name = data.name
    this.currentUser.passcode = data.passcode
    this.currentUser.preferred_name = data.preferred_name
    this.currentUser.event_id = data.event_id

    return this.currentUser
      .save()
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not updated')
      })
  }

  async remove() {
    return this.currentUser
      .remove()
      .then(res => {
        return {
          message: `User ${res._id} removed`
        }
      })
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not removed')
      })
  }
}
