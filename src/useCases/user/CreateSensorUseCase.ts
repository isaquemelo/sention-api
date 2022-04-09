import Sensor from '../../entities/Sensor'

import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

import { ISensorDTO } from '../interfaces/ISensorDTO'

export default class CreateSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(data: ISensorDTO, deviceId: string, userId: string): Promise<Sensor | false> {
        const sensor = new Sensor({ ...data })

        // Finds the current device
        const device = await this.deviceRepository.findOne({
            id: deviceId
        }, false)

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        return await this.sensorRepository.save(sensor, deviceId)
    }

}
