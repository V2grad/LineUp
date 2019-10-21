import { createController } from 'awilix-koa'
import { retrieveUser } from '../middleware/retrieve-user'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = userService => ({
  getUser: async ctx => ctx.ok(await userService.get(ctx.params.id)),
  createUser: async ctx =>
    ctx.created(await userService.create(ctx.request.body)),
  updateUser: async ctx =>
    ctx.update(await userService.update(ctx.params.id, ctx.request.body)),
  deleteUser: async ctx => ctx.delete(await userService.delete(ctx.params.id))
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/user')
  .before([retrieveUser])
  .post('', 'updateUser')
  .delete('', 'deleteUser')
