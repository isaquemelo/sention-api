import SensorData from '../../entities/SensorData'

import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

import { ISensorDataDTO } from '../interfaces/ISensorDataDTO'


export default class CreateSensorDataUseCase {
    constructor(private sensorRepository: ISensorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(data: ISensorDataDTO, deviceId: string, sensorId: string, userId: string): Promise<SensorData | false> {
        let date = new Date()

        if (data.timestamp) {
            date = new Date(data.timestamp)
            delete data.timestamp
        }

        const sensorData = new SensorData({ ...data, createdAt: date })

        // Finds the current device
        const device = await this.deviceRepository.findOne({ id: deviceId })

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        // Save sensor data
        return await this.sensorRepository.saveData(sensorData, sensorId)

    }

}
