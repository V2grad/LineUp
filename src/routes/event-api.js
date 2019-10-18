import { createController } from 'awilix-koa'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = eventService => ({
  getEvent: async ctx => ctx.ok(await eventService.get(ctx.params.id)),
  createEvent: async ctx =>
    ctx.created(await eventService.create(ctx.request.body)),
  updateEvent: async ctx =>
    ctx.update(await eventService.update(ctx.params.id, ctx.request.body)),
  deleteEvent: async ctx => ctx.delete(await eventService.delete(ctx.params.id))
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/event')
  .get('/:id', 'getEvent')
  .put('', 'createEvent')
  .post('/:id', 'updateEvent')
  .delete('/:id', 'deleteEvent')
