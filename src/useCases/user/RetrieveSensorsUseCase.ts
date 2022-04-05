import Sensor from '../../entities/Sensor'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'

export default class RetrieveSensorsUseCase {
    constructor(private sensorRepository: ISensorRepository) { }

    async execute(sensorId: string, deviceId: string): Promise<Sensor | false> {
        // Find device
        const sensor = await this.sensorRepository.findOne({
            id: sensorId,
        })

        // Device not found
        if (!sensor) return false

        // Does the user own the device?
        if (sensor.deviceId !== deviceId) return false

        return new Sensor(sensor)
    }

}
