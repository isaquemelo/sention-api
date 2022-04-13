import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

export default class DeleteActuatorUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(actuatorId: string, deviceId: string, userId: string): Promise<boolean> {

        // Find the current device
        const device = await this.deviceRepository.findOne({ id: deviceId })

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        return await this.actuatorRepository.delete(actuatorId)

    }

}
