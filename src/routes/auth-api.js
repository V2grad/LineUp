import { createController } from 'awilix-koa'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = authService => ({
  validate: async ctx => ctx.ok(await authService.get(ctx.header)),
  register: async ctx => ctx.created(await authService.create(ctx.request.body))
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/auth')
  .get('', 'validate')
  .post('', 'register')
