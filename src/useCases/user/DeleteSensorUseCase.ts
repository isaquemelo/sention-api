import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'
import { ISensorDTO } from '../interfaces/ISensorDTO'

export default class DeleteSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(sensorId: string, deviceId: string, userId: string): Promise<boolean> {

        // Find the current device
        const device = await this.deviceRepository.findOne({
            id: deviceId
        }, false)

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        return await this.sensorRepository.delete(sensorId)

    }

}
