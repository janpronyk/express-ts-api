import { CRUD } from "../../common/interfaces/crud.interface";
import UsersDao from "../daos/users.dao";

import {Prisma} from '@prisma/client'

class UsersService implements CRUD {

    async create(resource: Prisma.UserCreateInput) {
      return UsersDao.addUser(resource)
    }

    async list(skip: number, take: number) {
      return UsersDao.getUsers(skip, take)
    }

    async patchById(id: number, resource: Prisma.UserCreateInput): Promise<any> {
      return UsersDao.updateUserById(id, resource)
    }

    async putById(id: number, resource: Prisma.UserCreateInput): Promise<any> {
      return UsersDao.updateUserById(id, resource)
    }

    async readById(id: number) {
      return UsersDao.getUserById(id)
    }

    async getUserByEmail(email: string) {
      return UsersDao.getUserByEmail(email)
    }

    async getUserByEmailWithPassword(email: string) {
      return UsersDao.getUserByEmailWithPassword(email);
    }
    
    async deleteById(id: number) {
      return UsersDao.removeUserById(id)
    }
}

export default new UsersService()