import Hapi from '@hapi/hapi'
import admin from 'firebase-admin'

import credentials from '../credentials.json' assert { type: 'json' }
import routes from './routes'
import { db } from './utils/db'

//connecting to firebase
admin.initializeApp({ credential: admin.credential.cert(credentials) })

let hapiServer

const start = async () => {
  hapiServer = Hapi.server({
    port: 5000,
    host: 'localhost',
  })

  routes.forEach((route) => hapiServer.route(route))

  db.connect()

  await hapiServer.start()
  console.log(`Server started on ${hapiServer.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
process.on('SIGINT', async () => {
  console.log('Stopping server')
  await hapiServer.stop({ timeout: 10000 })
  db.end()
  console.log('Server stopped')
  process.exit(0)
})

start()
