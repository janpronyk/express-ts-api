import { Request, Response, NextFunction } from 'express'
import * as argon2 from 'argon2'
import usersService from '../../users/services/users.service'


class AuthMiddleware {
  
  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    const user: any = await usersService.getUserByEmailWithPassword(email)
    if (user) {
      const passwordHash = user.password
      if (await argon2.verify(passwordHash, password)) {
        req.body = {
          userId: user.id,
          email: user.email,
          provider: 'email',
          permissionFlags: user.permissionFlags
        }
        return next()
      }
      res.status(400).send({ errors: ['Invalid email and/or password'] })
    }
  }
}

export default new AuthMiddleware()