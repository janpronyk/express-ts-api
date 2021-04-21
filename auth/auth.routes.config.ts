import { Application } from 'express'
import { CommonRoutesConfig } from "../common/common.routes.config";
import { body } from 'express-validator'
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';


export class AuthRoutes extends CommonRoutesConfig {
  private _routePrefix = '/auth'
  
  constructor(app: Application) {
    super(app, 'AuthRoutes')
  }

  getRoutePrefix() {
    return this._routePrefix
  }

  configureRoutes(): Application {
    
    this.app.post(`${this._routePrefix}`, [
      body('email').isEmail(),
      body('password').isString(),
      bodyValidationMiddleware.verifyBodyFieldErrors,
      authMiddl
    ])
  }
}