import Sensor from '../../entities/Sensor'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'

export default class GetSensorUseCase {
    constructor(private sensorRepository: ISensorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(sensorId: string, deviceId: string, userId: string): Promise<Sensor | false> {

        // Find sensor
        const sensor = await this.sensorRepository.findOne({
            id: sensorId
        })

        // Finds the current device
        const device = await this.deviceRepository.findOne({
            id: deviceId
        }, false)

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        // Sensor not found
        if (!sensor) return false

        return new Sensor(sensor)
    }

}
