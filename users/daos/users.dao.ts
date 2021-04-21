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

  async addUser(user: CreateUserDto) {
    user.id = shortid.generate()
    this.users.push(user)
    return user.id
  }

  async getUsers() {
    return this.users
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId)
  }

  async putUserById(userId: string, user: PutUserDto) {
    const index = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    )
    this.users.splice(index, 1, user);
    return `${userId} updated via put`
  }

  async patchUserByUd(userId: string, user: PatchUserDto): Promise<string> {
    const index = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    )
    let currentUser = this.users[index]
    const allowedPatchFields = [
      'password',
      'firstName',
      'lastName',
      'permissionLevel'
    ]

    for (let field of allowedPatchFields) {
      if(field in user) {
        //@ts-ignore
        currentUser[field] = user[field]
      }
    }
    
    this.users.splice(index, 1, currentUser)
    return `${user.id} patched`
  }

  async removeUserById(userId: string) {
    const index = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    )
    this.users.splice(index, 1)
    return `${userId} removed`
  }
  
  async getUserByEmail(email: string) {
    const index = this.users.findIndex(
      (obj: { email: string }) => obj.email === email
    )
    let currentUser = this.users[index]
    if(currentUser) {
      return currentUser
    }
    return null
  }
 }

 export default new UsersDao()