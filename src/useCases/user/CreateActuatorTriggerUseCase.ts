import SensorData from '../../entities/SensorData'

import ActuatorTrigger from '../../entities/ActuatorTrigger'

import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

import { IActuatorTriggerDTO } from '../interfaces/IActuatorTriggerDTO'
import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'


export default class CreateActuatorTriggerUseCase {
    constructor(private actuatorsRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(data: IActuatorTriggerDTO, actuatorId: string, userId: string): Promise<ActuatorTrigger | false> {
        const actuatorTrigger = new ActuatorTrigger({ ...data })

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    actuators: {
                        some: {
                            id: actuatorId,
                        }
                    }
                }
            }
        })

        if (!user) return false

        // Save sensor data
        return await this.actuatorsRepository.saveTrigger(actuatorTrigger, actuatorId)

    }

}
