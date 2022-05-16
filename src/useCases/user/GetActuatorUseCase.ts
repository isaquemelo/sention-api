import Actuator from "../../entities/Actuator"
import { IActuatorRepository } from "../../repositories/interfaces/actuator/IActuatorRepository"
import { IUserRepository } from "../../repositories/interfaces/user/IUserRepository"

export default class GetActuatorUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private usersRepository: IUserRepository) { }

    async execute(actuatorId: string, userId: string): Promise<Actuator | false> {

        // Find actuator
        const actuator = await this.actuatorRepository.findOne({
            id: actuatorId
        })

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

        // Sensor not found
        if (!actuator) return false

        return new Actuator(actuator)
    }

}