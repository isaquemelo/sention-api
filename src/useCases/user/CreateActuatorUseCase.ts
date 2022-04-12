import Actuator from '../../entities/Actuator'

import { IActuatorRepository } from '../../repositories/interfaces/actuator/IActuatorRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

import { IActuatorDTO } from '../interfaces/IActuatorDTO'

export default class CreateActuatorUseCase {
    constructor(private actuatorRepository: IActuatorRepository, private deviceRepository: IDeviceRepository) { }

    async execute(data: IActuatorDTO, deviceId: string, userId: string): Promise<Actuator | false> {
        const actuator = new Actuator({ ...data })

        // Finds the current device
        const device = await this.deviceRepository.findOne({
            id: deviceId
        }, false)

        // Checks if the device belongs to the requesting user
        if (device && device.userId !== userId) {
            return false
        }

        return await this.actuatorRepository.save(actuator, deviceId)
    }

}
