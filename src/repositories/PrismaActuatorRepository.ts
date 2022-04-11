import { Prisma, PrismaClient } from '@prisma/client'
import { errors } from '../constants/errorMessages'

import Device from '../entities/Device'
import Actuator from '../entities/Actuator'

import { IActuatorRepository } from './interfaces/actuator/IActuatorRepository'
import { IActuatorFindingCriterias } from './interfaces/actuator/IActuatorFindingCriterias'

import prismaActuatorAdapter from './adapters/prismaActuatorAdapter'

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
}
