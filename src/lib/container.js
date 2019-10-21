import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix'
import { logger } from './logger'

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  // Services should be scoped to the request.
  // This means that each request gets a separate instance
  // of a service.
  ['services/*.js', Lifetime.SCOPED]
]

const modelsToLoad = [
  // Stores will be singleton (1 instance per process).
  // This is just for demo purposes, you can do whatever you want.
  [
    'models/*.js',
    {
      register: asValue,
      lifetime: Lifetime.SINGLETON
    }
  ]
]

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export function configureContainer() {
  const opts = {
    // Classic means Awilix will look at function parameter
    // names rather than passing a Proxy.
    injectionMode: InjectionMode.CLASSIC
  }
  return createContainer(opts)
    .loadModules(modelsToLoad, {
      cwd: `${__dirname}/..`,
      formatName: name => {
        let n = `${name.charAt(0).toUpperCase()}${name.substring(1)}`
        logger.info(`Model ${n} has loaded!`)
        return n
      }
    })
    .loadModules(modulesToLoad, {
      // `modulesToLoad` paths should be relative
      // to this file's parent directory.
      cwd: `${__dirname}/..`,
      // Example: registers `services/todo-service.js` as `todoService`
      formatName: 'camelCase'
    })
    .register({
      // Our logger is already constructed,
      // so provide it as-is to anyone who wants it.
      logger: asValue(logger)
    })
}
