import { ISensorRepository } from '../../repositories/interfaces/sensor/ISensorRepository'
import Sensor from '../../entities/Sensor'
import { ISensorDTO } from '../interfaces/ISensorDTO'

export default class CreateSensorUseCase {
    constructor(private sensorRepository: ISensorRepository) { }

    async execute(data: ISensorDTO, deviceId: string): Promise<Sensor | false> {

        const sensor = new Sensor({ ...data})

        return await this.sensorRepository.save(sensor, deviceId)
    }

}
