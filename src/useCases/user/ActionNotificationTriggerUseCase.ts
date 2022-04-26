import User from '../../entities/User'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import SendMailUseCase from './SendMailUseCase'



export default class ActionNotificationTriggerUseCase {
    private sendMailUseCase: SendMailUseCase

    constructor(private sensorRepository: ISensorRepository) {
        this.sendMailUseCase = new SendMailUseCase()
    }

    async execute(sensorId: string, sensorData: any, user: User): Promise<void> {
        const sensor = await this.sensorRepository.findOne({
            id: sensorId,
        })

        if (!sensor || !sensor.notificationTriggers) return

        sensor.notificationTriggers.forEach(trigger => {
            const { dataSource, value: referenceValue, logicOperator } = trigger

            let sensorValue = sensorData.data

            if (dataSource) {
                sensorValue = sensorData.data[dataSource]
            }

            if (logicOperator === "GREATER_THAN") {
                if (sensorValue > referenceValue) {
                    this.sendMailUseCase.execute(trigger, user.email)
                }
            }

            else if (logicOperator === "SMALLER_THAN") {
                if (sensorValue < referenceValue) {
                    this.sendMailUseCase.execute(trigger, user.email)
                }
            }
        })
    }

}
