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
                return new Sensor(sensor)
            }

            return false

        } catch (error) {
            throw new Error(errors.SENSOR_NOT_FOUND)
        }
    }

    async save(sensor: Sensor, deviceId: string): Promise<Sensor | false> {
        try {

            const savedSensor = await this.prisma.sensor.create({
                data: {
                    deviceId,
                    ...sensor
                }
            })

            await this.prisma.device.update({
                where: {
                    id: deviceId
                },

                data:{
                    sensors:{
                        create:{
                            ...sensor
                        }
                    }
                }
            })

            if (savedSensor) return new Sensor({ ...sensor, id: savedSensor.id})
        } catch (error) {
            throw new Error(errors.COULD_NOT_SAVE_SENSOR)
        }

        return false
    }
}
