import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

import Device from '../../entities/Device'
import { errors } from '../../constants/errorMessages'

export default class CreateDeviceUseCase {
    constructor(private deviceRepository: IDeviceRepository) { }

    async execute(): Promise<Device | false> {
        // Creates the device
        const device = await this.deviceRepository.createDevice()

        if (!device) return false;
        return new Device({ ...device })
    }

}
