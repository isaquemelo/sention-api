import { Prisma, PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'
import Sensor from '../entities/Sensor'
import SensorData from '../entities/SensorData'

import { ISensorFindingCriterias } from './interfaces/sensor/ISensorFindingCriterias'
import { ISensorRepository } from './interfaces/sensor/ISensorRepository'

import prismaSensorAdapter from './adapters/prismaSensorAdapter'
import prismaSensorDataAdapter from './adapters/prismaSensorDataAdapter'
import { ISensorDTO } from '../useCases/interfaces/ISensorDTO'
import NotificationTrigger from '../entities/NotificationTrigger'

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

    async delete(sensorId: string): Promise<boolean> {
        try {

            await this.prisma.sensor.delete({
                where: {
                    id: sensorId
                }
            })

            return true

        } catch (error) {
            throw new Error(errors.COULD_NOT_DELETE_SENSOR)
        }
    }

    async update(sensorId: string, data: Sensor): Promise<Sensor | false> {
        try {
            const updatedSensor = await this.prisma.sensor.update({
                where: {
                    id: sensorId
                }
                , data: {
                    name: data.name,
                    type: data.type,
                    port: data.port,
                }
            })
            if (updatedSensor) return prismaSensorAdapter(updatedSensor)
        } catch (error) {
            throw new Error(errors.COULD_NOT_UPDATE_SENSOR)
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

    async saveNotificationTrigger(notificationTrigger: NotificationTrigger, sensorId: string): Promise<NotificationTrigger | false> {

        try {
            const savedNotificationTrigger = await this.prisma.notificationTrigger.create({
                data: {
                    sensorId,
                    ...notificationTrigger,
                }
            })

            if (savedNotificationTrigger) return new NotificationTrigger({ ...notificationTrigger, id: savedNotificationTrigger.id })
        } catch (error) {
            throw new Error(errors.COULD_NOT_SAVE_NOTIFICATION_TRIGGER)
        }
        return false
    }

    async deleteNotificationTrigger(notificationTriggerId: string): Promise<boolean> {
        try {

            await this.prisma.notificationTrigger.delete({
                where: {
                    id: notificationTriggerId
                }
            })

            return true

        } catch (error) {
            throw new Error(errors.COULD_NOT_DELETE_SENSOR)
        }
    }

    async updateNotificationTrigger(notificationTrigger: NotificationTrigger): Promise<false | NotificationTrigger> {
        try {
            const updatedNotificationTrigger = await this.prisma.notificationTrigger.update({
                where: {
                    id: notificationTrigger.id,
                },
                data: {
                    ...notificationTrigger
                }
            })

            if (updatedNotificationTrigger) return new NotificationTrigger({ ...updatedNotificationTrigger, name: updatedNotificationTrigger.name || '', dataSource: updatedNotificationTrigger.dataSource ?? undefined })
        } catch {
            throw new Error(errors.COULD_NOT_UPDATE_NOTIFICATION_TRIGGER)
        }

        return false
    }


}
