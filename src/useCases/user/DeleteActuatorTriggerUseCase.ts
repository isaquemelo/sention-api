import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'


export default class DeleteActuatorTriggerUseCase {
    constructor(private actuatorsRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(actuatorTriggerId: string, userId: string): Promise<boolean> {
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

        // Save sensor data
        return await this.actuatorsRepository.deleteTrigger(actuatorTriggerId)

    }

}
