import { Prisma, PrismaClient, Product } from "@prisma/client"
import debug from "debug"

const prisma = new PrismaClient()
const log: debug.IDebugger = debug('app:cmspages-service')

class ProductsService {

  constructor() {
    log('Created new instance of CMSPagesService')
  }

  // TODO: add pagination
  async findAll(take = 15, skip = 0) {
    const result = await prisma.product.findMany({
      take,
      skip,
    })
    return result
  }


  async create(payload: Product ) {
    const result = await prisma.product.create({
      data: {
        ...payload
      }
    })
    return result.id
  }

  async findBySlug(slug: string) {
    const result = await prisma.product.findUnique({
      where: { slug },
    })
    return result
  }

  async patchBySlug(slug: string, payload: Product) {
    const result  = await prisma.product.update({
      where: { slug },
      data: {
        ...payload
      }
    })
    return result
  }

  async delete(slug: string) {

    const result = await prisma.product.delete({
      where: { slug }
    })
    return result
  }
}

export default new ProductsService()