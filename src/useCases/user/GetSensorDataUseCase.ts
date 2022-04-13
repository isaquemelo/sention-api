import SensorData from '../../entities/SensorData'

import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'

export default class GetSensorDataUseCase {
    constructor(private sensorRepository: ISensorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(sensorId: string, deviceId: string, userId: string, page: string, day: string): Promise<SensorData[] | false> {
        // Finds the current device
        const device = await this.deviceRepository.findOne({ id: deviceId })

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        const date = new Date(day)
        const aPage = parseInt(page)

        // Find sensor data
        const sensorData = await this.sensorRepository.getData(sensorId, aPage, date)

        return sensorData
    }

}
