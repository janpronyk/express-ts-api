import { CRUD } from "../../common/interfaces/crud.interface";
import UsersDao from "../daos/users.dao";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

class UsersService implements CRUD {

    async create(resource: CreateUserDto) {
      return UsersDao.addUser(resource)
    }

    async list(limit: number, page: number) {
      return UsersDao.getUsers()
    }

    async patchById(id: string, resource: PatchUserDto): Promise<any> {
      return UsersDao.updateUserById(id, resource)
    }

    async putById(id: string, resource: PutUserDto): Promise<any> {
      return UsersDao.updateUserById(id, resource)
    }

    async readById(id: string) {
      return UsersDao.getUserById(id)
    }

    async getUserByEmail(email: string) {
      return UsersDao.getUserByEmail(email)
    }

    async getUserByEmailWithPassword(email: string) {
      return UsersDao.getUserByEmailWithPassword(email);
    }
    
    async deleteById(id: string) {
      return UsersDao.removeUserById(id)
    }
}

export default new UsersService()