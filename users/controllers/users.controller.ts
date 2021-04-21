import { Request, Response } from 'express'
import debug from 'debug'
import usersService from '../services/users.service'
import argon2  from 'argon2'


const log: debug.IDebugger = debug('app:users-controller')

class UsersController {

  async listUsers(req: Request, res: Response) {
    const users = await usersService.list(100, 0)
    res.status(200).json({ users })
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.body.id
    const user = await usersService.readById(id)
    res.status(200).json({ user })
  }

  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password)
    const userId = await usersService.create(req.body)
    res.status(201).json({ id: userId })
  }

  async patch(req: Request, res: Response) {
    const { id } = req.body
    if(req.body.password)
      req.body.password = await argon2.hash(req.body.password)

    log(await usersService.patchById( id, req.body ))
    res.status(201).json({ message: 'successfuly patched user data'})
  }

  async put(req: Request, res: Response) {
    const { id } = req.body.id
    req.body.password = await argon2.hash(req.body.password)
    log(await usersService.putById(id, req.body))
    return res.status(201).json({ message: 'successfuly updated user' })
  }

  async removeUser(req: Request, res: Response) {
    const { id } = req.body.id
    log(await usersService.deleteById(id))
    return res.status(201).json({ message: 'successfuly removed user'})
  }
}

export default UsersController