import Sensor from '../../entities/Sensor'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

export default class GetSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(sensorId: string, userId: string): Promise<Sensor | false> {

        // Find sensor
        const sensor = await this.sensorRepository.findOne({
            id: sensorId
        })

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

        // Sensor not found
        if (!sensor) return false

        return new Sensor(sensor)
    }

}
