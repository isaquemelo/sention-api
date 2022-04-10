import { Prisma, PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'
import Sensor from '../entities/Sensor'
import SensorData from '../entities/SensorData'

import { ISensorFindingCriterias } from './interfaces/sensor/ISensorFindingCriterias'
import { ISensorRepository } from './interfaces/sensor/ISensorRepository'

import prismaSensorAdapter from './adapters/prismaSensorAdapter'
import prismaSensorDataAdapter from './adapters/prismaSensorDataAdapter'

export default class PrismaSensorRepository implements ISensorRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(params: ISensorFindingCriterias): Promise<Sensor | false> {
        try {
            const sensor = await this.prisma.sensor.findUnique({
                where: {
                    ...params,
                },

                include: {
                    notificationTriggers: true
                }
            })

            if (sensor) {
                return prismaSensorAdapter(sensor)
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
                    ...sensor,
                    port: sensor.port as Prisma.JsonObject
                }
            })

            if (savedSensor) return new Sensor({ ...sensor, id: savedSensor.id })
        } catch (error) {
            throw new Error(errors.COULD_NOT_SAVE_SENSOR)
        }

        return false
    }

    async saveData(sensorData: SensorData, sensorId: string): Promise<SensorData | false> {
        try {
            const data = await this.prisma.sensorData.create({
                data: {
                    sensorId,
                    ...sensorData,
                }
            })

            if (data) return sensorData
        } catch (error) {
            console.log('error', error)
            throw new Error(errors.COULD_NOT_SAVE_SENSOR_DATA)
        }

        return false
    }

    async getData(sensorId: string, page: number, day: Date): Promise<SensorData[] | false> {
        const perPage = 10
        const afterDay = new Date(day.getTime() + 86400000)
        const skip = (page - 1) * perPage

        try {
            const sensorData = await this.prisma.sensorData.findMany({
                take: perPage,
                skip,
                where: {
                    sensorId,
                    createdAt: {
                        gte: day,
                        lte: afterDay,
                    }
                }
            })

            if (sensorData) return sensorData.map((occurrence): SensorData => prismaSensorDataAdapter(occurrence))
        } catch (error) {
            throw new Error(errors.COULD_NOT_SAVE_SENSOR)
        }

        return false
    }
}
