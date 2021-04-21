import { Application } from 'express'
import { CommonRoutesConfig } from "../common/common.routes.config";


export class AuthRoutes extends CommonRoutesConfig {

  constructor(app: Application) {
    super(app, 'AuthRoutes')
  }

  configureRoutes(): Application {
    const routePrefix = '/users'

    this.app.post(`${routePrefix}`, [
      body('email').isEmail()
    ])
  }
}