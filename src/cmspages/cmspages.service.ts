import { CMSPage, PrismaClient } from "@prisma/client"
import debug from "debug"

const prisma = new PrismaClient()
const log: debug.IDebugger = debug('app:cmspages-service')

class CMSPageService {

  constructor() {
    log('Created new instance of CMSPagesService')
  }

  // TODO: add pagination
  async findAll() {
    const result = await prisma.cMSPage.findMany({})
    return result
  }


  async create(payload: CMSPage ) {
    const result = await prisma.cMSPage.create({
      data: {
        ...payload
      }
    })
    return result.id
  }

  async findBySlug(slug: string) {
    const result = await prisma.cMSPage.findUnique({
      where: { slug },
    })
    return result
  }

  async patchBySlug(slug: string, payload: CMSPage) {
    const result  = await prisma.cMSPage.update({
      where: { slug },
      data: {
        ...payload
      }
    })
    return result
  }

  async delete(slug: string) {

    const result = await prisma.cMSPage.delete({
      where: { slug }
    })
    return result
  }
}

export default new CMSPageService()