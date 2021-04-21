import e, { Request, Response, NextFunction } from 'express'

import debug from 'debug'
import usersService from '../services/users.service'


const log: debug.IDebugger = debug('app:users-controller')

class UsersMiddleware {
  
  async validateRequiredUserBodyFields(
    req: Request, res: Response, next: NextFunction) {
      if (req.body && req.body.email && req.body.password) {
        next()
      } else {
        res.status(400).send({
          error: 'Missing required fields email and password'
        })
      }
  }


  async validateSameEmailDoesntExist(
    req: Request, res: Response, next: NextFunction
  ) {
    const { email } = req.body
    const user = await usersService.getUserByEmail(email)
    if(user) {
      res.status(400).send({ error: 'User email already exists' })
    } else {
      next()
    }
  }


  async validateSameEmailBelongToSameUser(
    req: Request, res: Response, next: NextFunction
  ) {
    const {userId } = req.params
    const { email } = req.body
    const user = await usersService.getUserByEmail(email)
    if(user && user.id == userId) {
      next()
    } else {
      res.status(400).send({ error: 'Invalid email '})
    }
  }

  validatePatchEmail = async (
    req: Request, res: Response, next: NextFunction
  ) => {
    const { email } = req.body
    if(email) {
      log('Validating email', email)
      this.validateSameEmailBelongToSameUser(req, res, next)
    } else {
      next()
    }
  }

  async validateUserExists(
    req: Request, res: Response, next: NextFunction
  ) {
    const { userId } = req.params
    const user = await usersService.readById(userId)
    if(user) {
      next()
    } else {
      res.status(404).send({
        error: `User ${userId} not found`
      })
    }
  }

  async extractUserId(
    req: Request, res: Response, next: NextFunction
  ) {
    req.body.id = req.params.userId
    next()
  }
}

export default new UsersMiddleware()