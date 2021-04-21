import debug from "debug"
import shortid from "shortid"
import { CreateUserDto } from "../dto/create.user.dto"
import { PatchUserDto } from "../dto/patch.user.dto"
import { PutUserDto } from "../dto/put.user.dto"

const log: debug.IDebugger = debug('app:users-dao')

class UsersDao {
  users: Array<CreateUserDto> = []

  constructor() {
    log('Created new instance of UsersDao')
  }

 // TODO: Database operations 

  async addUser(userFields: CreateUserDto) {
  }

  async getUserByEmail(email: string) {
  }

  async getUserById(userId: string) {
  }

  async getUserByEmailWithPassword(email: string) {
  }

  async getUsers(limit = 25, page = 0) {
  }
 
  async updateUserById(
    userId: string, userFields: PatchUserDto | PutUserDto) {
  }

  async removeUserById(userId: string) {
  }
  
}

 export default new UsersDao()