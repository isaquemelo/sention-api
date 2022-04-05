import Device from '../../entities/Device'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

export default class RetrieveSensorsUseCase {
    constructor(private deviceRepository: IDeviceRepository) { }

    async execute(deviceId: string, userId: string): Promise<Device | false> {
        // Find device
        const device = await this.deviceRepository.findOne({
            id: deviceId,
        })

        // Device not found
        if (!device) return false

        // Does the user own the device?
        if (device.userId !== userId) return false

        return new Device(device)
    }

}
