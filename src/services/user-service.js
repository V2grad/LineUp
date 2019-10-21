import { BadRequest, GeneralError } from 'fejl'
// import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No id given')

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

  async update(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.name.length < 20, 'name is too long')

    // Make sure the user exists by calling `get`.
    let doc = await this.get(id)

    // Update
    if (doc) {
      doc.name = data.name
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
    return this.currentUser
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
