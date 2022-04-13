import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import { IActuatorTriggerDTO } from '../interfaces/IActuatorTriggerDTO'

import ActuatorTrigger from '../../entities/ActuatorTrigger'

export default class UpdateActuatorTriggerUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(data: IActuatorTriggerDTO, actuatorTriggerId: string, userId: string): Promise<ActuatorTrigger | false> {
        const actuatorTrigger = new ActuatorTrigger({ ...data, id: actuatorTriggerId })

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    actuators: {
                        some: {
                            triggers: {
                                some: {
                                    id: actuatorTriggerId
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!user) return false

        return await this.actuatorRepository.updateTrigger(actuatorTrigger)
    }

}
