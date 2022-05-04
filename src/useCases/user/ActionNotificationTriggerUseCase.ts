import User from '../../entities/User'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import SendMailUseCase from './SendMailUseCase'
import UpdateNotificationTriggerUseCase from './UpdateNotificationTriggerUseCase'
import NotificationTrigger from '../../entities/NotificationTrigger'
import { constants } from '../../constants/constants'



export default class ActionNotificationTriggerUseCase {
    private sendMailUseCase: SendMailUseCase
    private updateNotificationTriggerUseCase: UpdateNotificationTriggerUseCase

    constructor(private sensorRepository: ISensorRepository, private userRepository: IUserRepository) {
        this.sendMailUseCase = new SendMailUseCase()
        this.updateNotificationTriggerUseCase = new UpdateNotificationTriggerUseCase(sensorRepository, userRepository) 
    }

    async execute(sensorId: string, sensorData: any, user: User): Promise<void> {
        const sensor = await this.sensorRepository.findOne({
            id: sensorId,
        })

        if (!sensor || !sensor.notificationTriggers) return

        sensor.notificationTriggers.forEach(trigger => {
            const { dataSource, value: referenceValue, logicOperator, lastTriggered } = trigger

            const currentTriggered = new Date()
            const resultTriggered = currentTriggered.getTime() - lastTriggered.getTime() 

            if (resultTriggered < constants.LAST_TRIGGERED_TIME) return

            let sensorValue = sensorData.data
            
            if (dataSource) sensorValue = sensorData.data[dataSource]
            else sensorValue = sensorValue.value

            if (logicOperator === "GREATER_THAN") {
                if (sensorValue > referenceValue) {
                    this.sendMailUseCase.execute(trigger, user.email)
                    const updatedNotificationTrigger = new NotificationTrigger({...trigger, lastTriggered: currentTriggered})
                    this.updateNotificationTriggerUseCase.execute(updatedNotificationTrigger, updatedNotificationTrigger.id || "", user.id || "")
                }
            }

            else if (logicOperator === "SMALLER_THAN") {
                if (sensorValue < referenceValue) {
                    this.sendMailUseCase.execute(trigger, user.email)
                    const updatedNotificationTrigger = new NotificationTrigger({...trigger, lastTriggered: lastTriggered})
                    this.updateNotificationTriggerUseCase.execute(updatedNotificationTrigger, updatedNotificationTrigger.id || "", user.id || "")
                }
            }
        })
    }

}
