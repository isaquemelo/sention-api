import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

export default class DeleteSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(sensorId: string, userId: string): Promise<boolean> {
        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    sensors: {
                        some: {
                            id: sensorId,
                        }
                    }
                }
            }
        })

        if (!user) return false


        return await this.sensorRepository.delete(sensorId)

    }

}
