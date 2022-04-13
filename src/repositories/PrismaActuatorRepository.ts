import { Prisma, PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'
import Actuator from '../entities/Actuator'

import { IActuatorRepository } from './interfaces/actuator/IActuatorRepository'
import { IActuatorFindingCriterias } from './interfaces/actuator/IActuatorFindingCriterias'

import prismaActuatorAdapter from './adapters/prismaActuatorAdapter'
import ActuatorTrigger from '../entities/ActuatorTrigger'

export default class PrismaActuatorRepository implements IActuatorRepository {
    private prisma: PrismaClient = new PrismaClient()

    async findOne(params: IActuatorFindingCriterias): Promise<Actuator | false> {
        try {
            const actuator = await this.prisma.actuator.findUnique({
                where: {
                    ...params,
                },

                include: {
                    triggers: true
                }
            })

            if (actuator) {
                return prismaActuatorAdapter(actuator)
            }

            return false

        } catch (error) {
            throw new Error(errors.ACTUATOR_NOT_FOUND)
        }
    }

    async save(actuator: Actuator, deviceId: string): Promise<Actuator | false> {
        try {
            const savedActuator = await this.prisma.actuator.create({
                data: {
                    deviceId,
                    ...actuator,
                }
            })

            if (savedActuator) return new Actuator({ ...actuator, id: savedActuator.id })
        } catch (error) {
            throw new Error(errors.COULD_NOT_SAVE_SENSOR)
        }

        return false
    }

    async update(actuator: Actuator): Promise<Actuator | false> {
        try {
            const updatedActuator = await this.prisma.actuator.update({
                where: {
                    id: actuator.id,
                },
                data: {
                    name: actuator.name,
                    type: actuator.type,
                    port: actuator.port,
                }
            })

            if (updatedActuator) return new Actuator({ ...updatedActuator })
        } catch (error) {
            throw new Error(errors.COULD_NOT_UPDATE_ACTUATOR)
        }

        return false
    }

    async updateTrigger(trigger: ActuatorTrigger): Promise<false | ActuatorTrigger> {
        try {
            const updatedTrigger = await this.prisma.actuatorTrigger.update({
                where: {
                    id: trigger.id,
                },
                data: {
                    ...trigger
                }
            })

            if (updatedTrigger) return new ActuatorTrigger({ ...updatedTrigger })
        } catch (error) {
            throw new Error(errors.COULD_NOT_UPDATE_ACTUATOR_TRIGGER)
        }

        return false
    }

    async delete(actuatorId: string): Promise<boolean> {
        try {

            await this.prisma.actuator.delete({
                where: {
                    id: actuatorId
                }
            })

            return true

        } catch (error) {
            throw new Error(errors.COULD_NOT_DELETE_ACTUATOR)
        }
    }

    async saveTrigger(trigger: ActuatorTrigger, actuatorId: string): Promise<ActuatorTrigger | false> {
        try {
            const savedActuatorTrigger = await this.prisma.actuatorTrigger.create({
                data: {
                    actuatorId,
                    ...trigger,
                }
            })

            if (savedActuatorTrigger) return new ActuatorTrigger({ ...trigger, id: savedActuatorTrigger.id })
        } catch (error) {
            throw new Error(errors.COULD_NOT_SAVE_ACTUATOR_TRIGGER)
        }
        return false
    }

    async deleteTrigger(triggerId: string): Promise<boolean> {
        try {

            await this.prisma.actuatorTrigger.delete({
                where: {
                    id: triggerId
                }
            })

            return true

        } catch (error) {
            throw new Error(errors.COULD_NOT_DELETE_ACTUATOR)
        }
    }
}
