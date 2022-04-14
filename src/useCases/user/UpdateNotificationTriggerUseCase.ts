import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { INotificationTriggerDTO } from '../interfaces/INotificationTriggerDTO'
import NotificationTrigger from '../../entities/NotificationTrigger'

export default class UpdateNotificationTriggerUseCase {
    constructor(private sensorsRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(data: INotificationTriggerDTO, notificationTriggerId: string, userId: string): Promise<NotificationTrigger | false> {
        const notificationTrigger = new NotificationTrigger({ ...data, id: notificationTriggerId})

        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    sensors: {
                        some: {
                            notificationTriggers: {
                                some: {
                                    id: notificationTriggerId
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!user) return false

        return await this.sensorsRepository.updateNotificationTrigger(notificationTrigger)
    }

}
