import { Request, Response } from 'express'
import debug from 'debug'
import usersService from '../services/users.service'
import argon2  from 'argon2'
import { PatchUserDto } from '../dto/patch.user.dto'


const log: debug.IDebugger = debug('app:users-controller')

class UsersController {

  async listUsers(req: Request, res: Response) {
    const users = await usersService.list(100, 0)
    res.status(200).send({ users })
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.body.id
    const user = await usersService.readById(id)
    res.status(200).send({ user })
  }

  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password)
    const userId = await usersService.create(req.body)
    res.status(201).send({ id: userId })
  }

  async patch(req: Request, res: Response) {
    const { id } = req.body
    if(req.body.password)
      req.body.password = await argon2.hash(req.body.password)
    log(await usersService.patchById( id, req.body ))
    res.status(204).send()
  }

  async put(req: Request, res: Response) {
    const { id } = req.body.id
    req.body.password = await argon2.hash(req.body.password)
    log(await usersService.putById(id, req.body))
    return res.status(204).send()
  }

  async removeUser(req: Request, res: Response) {
    const { id } = req.body.id
    log(await usersService.deleteById(id))
    return res.status(204).send()
  }

  async updatePermissionFlags(req: Request, res: Response) {
    const patchUserDto: PatchUserDto = {
        permissionFlags: parseInt(req.params.permissionFlags),
    };
    log(await usersService.patchById(req.body.id, patchUserDto));
    res.status(204).send();
}
}

export default new UsersController()