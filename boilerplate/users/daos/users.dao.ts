import { Prisma, PrismaClient } from "@prisma/client"
import debug from "debug"
import { CreateUserDto } from "../dto/create.user.dto"

const prisma = new PrismaClient()

const log: debug.IDebugger = debug('app:users-dao')

class UsersDao {
  users: Array<CreateUserDto> = []

  constructor() {
    log('Created new instance of UsersDao')
  }

  async addUser(userFields: Prisma.UserCreateInput) {
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

  async getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: { password: false }
    })
    return user
  }

  async getUserById(userId: number) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { password: false }
    })
    return user
  }

  async getUserByEmailWithPassword(email: string) {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        email: true,
        permissionFlags: true,
        password: true
      }
    })

    return user
  }

  async getUsers(take = 15, skip = 0) {
    const users = await prisma.user.findMany({
      skip,
      take,
      select: { password: false },
    })
    return users
  }
 
  async updateUserById(
    userId: number, userFields: Prisma.UserCreateInput) {
      // TODO:
  }

  async removeUserById(userId: number) {
    const result = await prisma.user.delete({
      where: { id: userId }
    })
    return result
  }
  
}

 export default new UsersDao()