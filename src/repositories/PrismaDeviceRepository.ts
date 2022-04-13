import { PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'

import prismaDeviceAdapter from './adapters/prismaDeviceAdapter'

import { makeUniqueAccessCode } from '../main/factories/makeUniqueAccessCode'

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
            })

            if (device) {
                return new Device({ ...device, sensors: [], actuators: [] })
            }

            return false
        } catch (error) {
            throw new Error(errors.DEVICE_NOT_FOUND)
        }
    }

    async findOneWithRelations(params: IDeviceFindingCriterias): Promise<Device | false> {
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
                return prismaDeviceAdapter(device)
            }

            return false
        } catch (error) {
            throw new Error(errors.DEVICE_NOT_FOUND)
        }
    }

    async createDevice(): Promise<false | Device> {
        const device = await this.prisma.device.create({
            data: {
                accessCode: makeUniqueAccessCode()
            },
            include: {
                sensors: true,
                actuators: {
                    include: {
                        triggers: true,
                    }
                },
            }
        })

        if (device) return prismaDeviceAdapter(device)
        return false
    }
}
