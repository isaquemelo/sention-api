import { PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'
import User from '../entities/User'
import prismaUserAdapter from './adapters/prismaUserAdapter'
import { IUserFindingCriterias } from './interfaces/user/IUserFindingCriterias'
import { IUserRepository } from './interfaces/user/IUserRepository'


export default class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(params: IUserFindingCriterias): Promise<User | false> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    ...params,
                },
                include: {
                    devices: {
                        orderBy: [
                            {
                                name: 'asc',
                            },
                        ],
                        include: {
                            actuators: {
                                include: {
                                    triggers: true,
                                },
                                orderBy: [
                                    {
                                        createdAt: 'desc',
                                    },
                                ],
                            },
                            sensors: {
                                orderBy: [
                                    {
                                        createdAt: 'desc',
                                    },
                                ],
                            },
                        }
                    },
                },
            })

            // ToDo: Return user devices as well
            if (user) return prismaUserAdapter(user)

        } catch (error) {
            throw new Error(errors.USER_NOT_FOUND)
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
            console.log("error", error)
            throw new Error(errors.COULD_NOT_SAVE_USER)
        }

        return false
    }

    async associateDeviceToUser(deviceId: string, userId: string): Promise<boolean> {
        try {
            const user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    devices: {
                        connect: {
                            id: deviceId,
                        }
                    }
                }
            })

            if (!user) return false
            return true
        } catch (error) {
            throw new Error(errors.COULD_NOT_ASSOCIATE_DEVICE)
        }
    }

    async dissociateDevice(deviceId: string, userId: string): Promise<boolean> {
        try {
            await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    devices: {
                        disconnect: {
                            id: deviceId,
                        }
                    }
                }
            })

            return true
        } catch (error) {
            throw new Error(errors.COULD_NOT_DISSOCIATE_DEVICE)
        }
    }
}
