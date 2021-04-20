import { Application, Request, Response, NextFunction } from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config';


export class UserRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes() {
    const routePrefix = '/users'

    this.app.route(`/users`)
      .get((req: Request, res: Response) => {
        res.status(200).json('List of users')
      })
      .post((req: Request, res: Response) => {
        res.status(200).json('Post to users')
      })

    this.app.route(`${routePrefix}/:userId`)
      .all((req: Request, res: Response, next: NextFunction) => {
        next()
      })
      .get((req: Request, res: Response) =>{
        const { userId } = req.params
        res.status(200).json(`Get for user id ${userId}`)
      })
      .put((req: Request, res: Response) => {
        const { userId } = req.params
        res.status(200).json(`Put for user ${userId}`)
      })
      .patch((req: Request, res: Response) => {
        const { userId } = req.params
        res.status(200).json(`Patch for user ${userId}`)
      })
      .delete((req: Request, res: Response) => {
        const { userId } = req.params
        res.status(200).json(`Delete for user ${userId}`)
      })

    return this.app
  }
}