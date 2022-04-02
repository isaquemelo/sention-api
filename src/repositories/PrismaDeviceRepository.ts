import { Prisma, PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'
import Sensor from '../entities/Sensor'
import User from '../entities/User'

import { IDeviceFindingCriterias } from './interfaces/device/IDeviceFindingCriterias'
import { IDeviceRepository } from './interfaces/device/IDeviceRepository'



export default class PrismaDeviceRepository implements IDeviceRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(params: IDeviceFindingCriterias): Promise<Device | false> {
        try {
            const device = await this.prisma.device.findUnique({
                where: {
                    ...params,
                },

                include: {
                    actuators: {
                        include: {
                            triggers: true,
                        }
                    },
                    sensors: true,
                }
            })

            if (device) {
                const userId: string = device.userId || ""
                return new Device({ ...device, userId })
            }

            return false

        } catch (error) {
            throw new Error(errors.DEVICE_NOT_FOUND)
        }
    }
}
