import User from '../models/user'
import { BadRequest } from 'fejl'
import { asValue } from 'awilix'
import { logger } from '../lib/logger'

/**
 * Register Context helps to add request-specific data to the scope.
 * Imagine some auth middleware somewhere...
 */
export async function retrieveUser(ctx, next) {
  // header: user-id
  BadRequest.assert(ctx.header['user_id'], 'User id required in this area :(')
  BadRequest.assert(
    ctx.header['passcode'],
    'User passcode required in this area :('
  )
  let id = ctx.header['user_id']
  let code = ctx.header['passcode']

  let user = await User.find()
    .validateUser({ id, code })
    .exec()
    .catch(err => {
      logger.error(err)
      return null
    })

  BadRequest.assert(user, 'User is not vaild :(')

  ctx.state.container.register({
    currentUser: asValue({
      user
    })
  })
  return next()
}
