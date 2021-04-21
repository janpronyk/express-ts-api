import { Application, Request, Response, NextFunction } from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';


export class UserRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes() {
    const routePrefix = '/users'

    this.app
      .route(`/users`)
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      )

    this.app.param('userId', UsersMiddleware.extractUserId)
    this.app
      .route(`${routePrefix}/:userId`)
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser)
    
    this.app.put(`${routePrefix}/:userId`, [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put
    ])

    this.app.patch(`${routePrefix}/:userId`, [
      UsersMiddleware.validatePatchEmail,
      UsersController.patch
    ])

    return this.app
  }
}