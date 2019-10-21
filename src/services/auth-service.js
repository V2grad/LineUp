import { BadRequest, GeneralError } from 'fejl'
// import { pick } from 'lodash'

/**
 * Auth Service.
 */
export default class AuthService {
  constructor(User, logger) {
    this.logger = logger
    this.user = User
  }

  async validate(header) {
    BadRequest.assert(header['user_id'], 'User id required in this area :(')
    BadRequest.assert(
      header['passcode'],
      'User passcode required in this area :('
    )
    let id = header['user_id']
    let code = header['passcode']

    let user = await this.user
      .find()
      .validateUser({ id, code })
      .exec()
      .catch(err => {
        this.logger.error(err)
        return null
      })

    BadRequest.assert(user, 'User is not vaild :(')
    return user
  }

  async create(data) {
    BadRequest.assert(data, 'No payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.name.length < 20, 'name is too long')

    return this.user
      .create({
        name: data.name
      })
      .then(res => res)
      .catch(err => {
        this.logger.error(err)
        return GeneralError.assert(null, 'User not created.')
      })
  }
}
