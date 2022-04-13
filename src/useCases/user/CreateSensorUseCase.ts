import Sensor from '../../entities/Sensor'

import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

import { ISensorDTO } from '../interfaces/ISensorDTO'

export default class CreateSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(data: ISensorDTO, deviceId: string, userId: string): Promise<Sensor | false> {
        const sensor = new Sensor({ ...data })

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    id: deviceId
                }
            }
        })

        if (!user) return false

        return await this.sensorRepository.save(sensor, deviceId)
    }

}
