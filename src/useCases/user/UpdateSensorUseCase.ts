import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { ISensorDTO } from '../interfaces/ISensorDTO'
import Sensor from '../../entities/Sensor'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

export default class UpdateSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(data: ISensorDTO, sensorId: string, userId: string): Promise<Sensor | false> {

        const sensor = new Sensor(data)

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

        return await this.sensorRepository.update(sensorId, sensor)

    }

}
