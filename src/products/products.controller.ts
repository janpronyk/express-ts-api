import express from 'express'
import debug from 'debug'
import ProductsService from './products.service'

const log: debug.IDebugger = debug('app:products-controller')

class ProductsController {


    // TODO: add pagination
  async list(req: express.Request, res: express.Response) {
    const pages = await ProductsService.findAll()
    res.status(200).send({ pages })
  }

  async create(req: express.Request, res: express.Response) {
    await ProductsService.create(req.body)
    res.status(204).send()
  }

  async patch(req: express.Request, res: express.Response) {
    const { slug } = req.params
    log(await ProductsService.patchBySlug( slug, req.body ))
    res.status(204).send()
  }

  async get(req: express.Request, res: express.Response) {
    const { slug } = req.params
    const page = await ProductsService.findBySlug(slug)
    res.status(200).send({ page })
  }

  async delete(req: express.Request, res: express.Response) {
    const { slug } = req.params
    const result = await ProductsService.delete(slug)
    res.status(204).send(result)
  }

}

export default new ProductsController()