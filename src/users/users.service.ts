import { PrismaClient, User } from "@prisma/client"
import debug from "debug"

const prisma = new PrismaClient()
const log: debug.IDebugger = debug('app:users-service')

class UsersService {

  constructor() {
    log('Created new instance of UsersService')
  }

  // TODO: add pagination
  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
        avatarImage: true
      }
    })
    return users
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
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        username: true,
        email: true,
        avatarImage: true
      }
    })
    return user
  }

  async patchById(id: number, userFields: User) {
    const result  = await prisma.user.update({
      where: { id },
      data: {
        ...userFields
      },
      select: {
        username: true,
        email: true,
        avatarImage: true
      }
    })
    return result
  }

  async delete(id: number) {

    const result = await prisma.user.delete({
      where: { id }
    })
    return result
  }
}

export default new UsersService()