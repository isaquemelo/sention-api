import Actuator from '../../entities/Actuator'

import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

import { IActuatorDTO } from '../interfaces/IActuatorDTO'

export default class CreateActuatorUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(data: IActuatorDTO, deviceId: string, userId: string): Promise<Actuator | false> {
        const actuator = new Actuator({ ...data })

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    id: deviceId,
                }
            }
        })

        if (!user) return false

        return await this.actuatorRepository.save(actuator, deviceId)
    }

}
