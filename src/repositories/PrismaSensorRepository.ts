import { PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'
import Sensor from '../entities/Sensor'
import User from '../entities/User'

import { ISensorFindingCriterias } from './interfaces/sensor/ISensorFindingCriterias'
import { ISensorRepository } from './interfaces/sensor/ISensorRepository'



export default class PrismaSensorRepository implements ISensorRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(params: ISensorFindingCriterias): Promise<Sensor | false> {
        try {
            const sensor = await this.prisma.sensor.findUnique({
                where: {
                    ...params,
                },
                
                include:{
                    notificationTriggers: true
                }
            })

            if (sensor) {
                const deviceId: string = sensor.deviceId || ""
                return new Sensor({...sensor, deviceId})
            }

            return false

        } catch (error) {
            throw new Error(errors.SENSOR_NOT_FOUND)
        }
    }
}
