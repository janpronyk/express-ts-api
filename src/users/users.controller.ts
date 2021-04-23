import express from 'express'
import argon2  from 'argon2'
import debug from 'debug'
import UsersService from './users.service'

const log: debug.IDebugger = debug('app:users-controller')

class UsersController {

  async list(req: express.Request, res: express.Response) {
    const users = await UsersService.findAll()
    res.status(200).send({ users })
  }

  async create(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password)
    const userId = await UsersService.create(req.body)
    res.status(201).send({ id: userId })
  }

  async patch(req: express.Request, res: express.Response) {
    const id = parseInt(req.params.userId)
    if(req.body.password)
      req.body.password = await argon2.hash(req.body.password)
    log(await UsersService.patchById( id, req.body ))
    res.status(204).send()
  }

  async getById(req: express.Request, res: express.Response) {
    const id = parseInt(req.params.userId)
    const user = await UsersService.findById(id)
    res.status(200).send({ user })
  }

  async delete(req: express.Request, res: express.Response) {
    const id = parseInt(req.params.userId)
    const result = await UsersService.delete(id)
    res.status(204).send(result)
  }

}

export default new UsersController()