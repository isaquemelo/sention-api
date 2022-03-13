import { Prisma, PrismaClient } from '@prisma/client'
import User from '../entities/User'
import { IUserRepository } from './interfaces/IUserRepository'

export default class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(id: string): Promise<User | false> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },

            include: {
                devices: true,
            },
        })

        // ToDo: Return user devices as well
        if (user) return new User({ ...user, devices: [] })
        return false
    }


    async save(user: User): Promise<User | false> {
        const savedUser = await this.prisma.user.create({
            data: {
                ...user
            }
        })

        // ToDo: Save devices
        if (savedUser) return new User({ ...savedUser, devices: [] })
        return false
    }
}
