import { Prisma, PrismaClient, User } from "@prisma/client"
import debug from "debug"

const prisma = new PrismaClient()
const log: debug.IDebugger = debug('app:users-dao')

class UsersService {

  constructor() {
    log('Created new instance of UsersService')
  }

  async create(userFields: User ) {
    const { email, username, password, avatarImage } = userFields
    const result = await prisma.user.create({
      data: {
        email,
        username,
        password,
        avatarImage,
      }
    })
    return result.id
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user
  }

  async patchById(id: number, userFields: User) {
    // TODO:
  }

  async delete(id: number) {

    const result = await prisma.user.delete({
      where: { id }
    })
    return result
  }
}

export default new UsersService()