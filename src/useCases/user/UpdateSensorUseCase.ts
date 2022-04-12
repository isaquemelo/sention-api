import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'
import { ISensorDTO } from '../interfaces/ISensorDTO'
import Sensor from '../../entities/Sensor'

export default class UpdateSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(data: ISensorDTO, sensorId: string, deviceId: string, userId: string): Promise<Sensor | false> {

        const sensor = new Sensor(data)

        // Find the current device
        const device = await this.deviceRepository.findOne({
            id: deviceId
        }, false)

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        return await this.sensorRepository.update(sensorId, sensor)

    }

}
