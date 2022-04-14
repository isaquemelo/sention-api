import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import { IDeviceRepository } from '../../repositories/interfaces/device/IDeviceRepository'

import Device from '../../entities/Device'
import { errors } from '../../constants/errorMessages'

export default class AssociateDeviceToUserUseCase {
    constructor(private userRepository: IUserRepository, private deviceRepository: IDeviceRepository) { }

    async execute(accessCode: string, userId: string): Promise<Device | false> {
        // find the device using the access code (device repository)
        const device = await this.deviceRepository.findOne({ accessCode })

        // check if its a valid device
        if (!device) throw new Error(errors.COULD_NOT_FIND_DEVICE)

        // check if the device is associated (if so, return error)
        if (device && device.userId?.length) return false

        // otherwise, update user x device relation (user repository)
        this.userRepository.associateDeviceToUser(device.id, userId)

        return new Device({ ...device, userId })
    }

}
