import express, { Application, Request, Response } from 'express'
import * as http from 'http'

import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from 'debug'

import { CommonRoutesConfig } from './common/common.routes.config'
import { UserRoutes } from './users/users.routes.config'


const app: Application = express()
const server: http.Server = http.createServer(app)
const PORT = process.env.PORT || '3000'
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')


app.use(express.json())
app.use(cors())

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
}

if(process.env.DEBUG) {
  process.on('unhandledRejection', function(reason) {
    debugLog('Unhandled Rejection', reason)
    process.exit(1)
  })
} else {
  loggerOptions.meta = false
}

app.use(expressWinston.logger(loggerOptions))


routes.push(new UserRoutes(app))


app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`Server up and running!`)
});

server.listen(PORT, () => {
  debugLog(`Server running at http://localhost:${PORT}`)
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })
})