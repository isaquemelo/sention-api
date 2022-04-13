import SensorData from '../../entities/SensorData'

import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

export default class GetSensorDataUseCase {
    constructor(private sensorRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(sensorId: string, userId: string, page: string, day: string): Promise<SensorData[] | false> {
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

        const date = new Date(day)
        const aPage = parseInt(page)

        // Find sensor data
        const sensorData = await this.sensorRepository.getData(sensorId, aPage, date)

        return sensorData
    }

}
