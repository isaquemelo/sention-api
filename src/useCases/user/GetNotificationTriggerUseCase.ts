import NotificationTrigger from '../../entities/NotificationTrigger'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'


export default class GetNotificationTriggerUseCase {
    constructor(private sensorsRepository: ISensorRepository, private usersRepository: IUserRepository) { }

    async execute(notificationTriggerId: string, userId: string): Promise<NotificationTrigger | false> {

        // Checks if the current user is the owner of the inteded thing to be changed
        const user = await this.usersRepository.findOne({
            id: userId,

            devices: {
                some: {
                    sensors:{
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

        return await this.sensorsRepository.findOneNotificationTrigger(notificationTriggerId)
    }

}
