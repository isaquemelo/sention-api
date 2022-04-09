import Sensor from '../../entities/Sensor'
import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'

export default class GetSensorUseCase {
    constructor(private sensorRepository: ISensorRepository) { }

    async execute(sensorId: string): Promise<Sensor | false> {
        // Find sensor
        const sensor = await this.sensorRepository.findOne({
            id: sensorId
        })

        // Sensor not found
        if (!sensor) return false

        return new Sensor(sensor)
    }

}
