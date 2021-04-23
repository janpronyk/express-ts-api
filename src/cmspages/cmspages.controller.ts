import express from 'express'
import debug from 'debug'
import CMSPagesService from './cmspages.service'

const log: debug.IDebugger = debug('app:cmspages-controller')

class CMSPagesController {

    // TODO: add pagination
    async list(req: express.Request, res: express.Response) {
        const pages = await CMSPagesService.findAll()
        res.status(200).send({ pages })
    }

    async get(req: express.Request, res: express.Response) {
        const { slug } = req.params
        const page = await CMSPagesService.findBySlug(slug)
        res.status(200).send({ page })
    }

    async create(req: express.Request, res: express.Response) {
        await CMSPagesService.create(req.body)
        res.status(204).send()
    }

    async patch(req: express.Request, res: express.Response) {
        const { slug } = req.params
        log(await CMSPagesService.patchBySlug( slug, req.body ))
        res.status(204).send()
    }

    async delete(req: express.Request, res: express.Response) {
        const { slug } = req.params
        await CMSPagesService.delete(slug)
        res.status(204).send()
    }

}

export default new CMSPagesController()