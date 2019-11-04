import { createController } from 'awilix-koa'
import { retrieveUser } from '../middleware/retrieve-user'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = requestService => ({
  getRequest: async ctx => ctx.ok(await requestService.get(ctx.params.id)),
  createRequest: async ctx =>
    ctx.created(await requestService.create(ctx.request.body)),
  updateRequest: async ctx =>
    ctx.update(await requestService.update(ctx.params.id, ctx.request.body)),
  cancelEvent: async ctx =>
    ctx.update(await requestService.cancel(ctx.params.id))
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/request')
  .before([retrieveUser])
  .get('/:id', 'getRequest')
  .put('', 'createRequest')
  .post('/:id', 'updateRequest')
