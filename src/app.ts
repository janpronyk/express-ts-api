import express, { Application, Request, Response } from 'express'
import * as http from 'http'

import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from 'debug'
import helmet from 'helmet'
import { CommonRoutesConfig } from './common/common.routes.config'

// import { CommonRoutesConfig } from './toptal/common/common.routes.config'
// import { UserRoutes } from './toptal/users/users.routes.config'
// import { AuthRoutes } from './toptal/auth/auth.routes.config'


const app: Application = express()
const server: http.Server = http.createServer(app)
const PORT = process.env.PORT || '3000'
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')


app.use(express.json())
app.use(cors())
app.use(helmet())

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
  // if (typeof global.it === 'function') {
  //   loggerOptions.level = 'http'
  // }
}

app.use(expressWinston.logger(loggerOptions))


// routes.push(new UserRoutes(app))
// routes.push(new AuthRoutes(app))


app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`Server running at http://localhost:${PORT}`)
});

server.listen(PORT, () => {
  debugLog(`Server running at http://localhost:${PORT}`)
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })
})