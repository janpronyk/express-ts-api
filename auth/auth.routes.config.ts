import { Application } from 'express'
import { CommonRoutesConfig } from "../common/common.routes.config";
import { body } from 'express-validator'
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import authMiddleware from './middleware/auth.middleware';
import authController from './controlers/auth.controller';
import jwtMiddleware from './middleware/jwt.middleware';


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
      authMiddleware.verifyUserPassword,
      authController.createJWT
    ])

    this.app.post(`${this._routePrefix}/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJWT
    ])

    return this.app
  }
}