import { Prisma, PrismaClient } from '@prisma/client'
import { constants } from '../constants'
import User from '../entities/User'
import { IUserFindingCriterias } from './interfaces/IUserFindingCriterias'
import { IUserRepository } from './interfaces/IUserRepository'


export default class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(params: IUserFindingCriterias): Promise<User | false> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    ...params,
                },

                include: {
                    devices: true,
                },
            })

            // ToDo: Return user devices as well
            if (user) return new User({ ...user, devices: [] })

        } catch (error) {
            throw new Error(constants.USER_NOT_FOUND)
        }

        return false
    }


    async save(user: User): Promise<User | false> {
        try {
            const savedUser = await this.prisma.user.create({
                data: {
                    ...user
                }
            })

            // ToDo: Save devices
            if (savedUser) return new User({ ...savedUser, devices: [] })
        } catch (error) {
            throw new Error(constants.COULD_NOT_SAVE_USER)
        }

        return false
    }
}
