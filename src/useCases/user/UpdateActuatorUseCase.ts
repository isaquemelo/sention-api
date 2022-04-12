import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import { IActuatorDTO } from '../interfaces/IActuatorDTO'

import Actuator from '../../entities/Actuator'

export default class UpdateActuatorUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(data: IActuatorDTO, actuatorId: string, userId: string): Promise<Actuator | false> {
        const actuator = new Actuator({ ...data, id: actuatorId })

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    actuators: {
                        some: {
                            id: actuatorId
                        }
                    }
                }
            }
        })

        if (!user) return false

        return await this.actuatorRepository.update(actuator)
    }

}
