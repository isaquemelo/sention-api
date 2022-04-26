import SensorData from '../../entities/SensorData'

import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'

import { ISensorDataDTO } from '../interfaces/ISensorDataDTO'

import ActionNotificationTriggerUseCase from './ActionNotificationTriggerUseCase'

export default class CreateSensorDataUseCase {
    private actionNotificationTriggerUseCase: ActionNotificationTriggerUseCase

    constructor(private sensorRepository: ISensorRepository, private usersRepository: IUserRepository) {
        this.actionNotificationTriggerUseCase = new ActionNotificationTriggerUseCase(sensorRepository)
    }

    async execute(data: ISensorDataDTO, sensorId: string, userId: string): Promise<SensorData | false> {
        let date = new Date()

        if (data.timestamp) {
            date = new Date(data.timestamp)
            delete data.timestamp
        }

        const sensorData = new SensorData({ ...data, createdAt: date })

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    sensors: {
                        some: {
                            id: sensorId
                        }
                    }
                }
            }
        })

        if (!user) return false

        // Sends mails if necessary
        this.actionNotificationTriggerUseCase.execute(sensorId, sensorData, user)

        // Save sensor data
        return await this.sensorRepository.saveData(sensorData, sensorId)

    }

}
