import ActuatorTrigger from '../../entities/ActuatorTrigger'
import { IActuatorTriggerDTO } from '../interfaces/IActuatorTriggerDTO'
import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import NotificationTrigger from '../../entities/NotificationTrigger'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { INotificationTriggerDTO } from '../interfaces/INotificationTriggerDTO'


export default class CreateNotificationTriggerUseCase {
    constructor(private sensorsRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(data: INotificationTriggerDTO, sensorId: string, userId: string): Promise<NotificationTrigger | false> {
        
        const notificationTrigger = new NotificationTrigger({...data})

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

        return await this.sensorsRepository.saveNotificationTrigger(notificationTrigger, sensorId)
    }

}
