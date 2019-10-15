import mongoose from 'mongoose'
// import fs from 'fs'
// import { join } from 'path'
import { env } from './env'

const connectURL = env.MONGO_DB_URL
// const models = join(__dirname, '../models')
// No longer preload models!
// // Preload all models
// fs.readdirSync(models)
//   .filter(file => ~file.search(/^[^.].*\.js$/))
//   .forEach(file => require(join(models, file)))

export function connect() {
  mongoose.connection.on('error', console.log).on('disconnected', connect)
  return mongoose.connect(
    connectURL,
    { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true }
  )
}
