import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

export default class DeleteActuatorUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(actuatorId: string, userId: string): Promise<boolean> {

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

        return await this.actuatorRepository.delete(actuatorId)

    }

}
