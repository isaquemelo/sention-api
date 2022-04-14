import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import Device from '../../entities/Device'

export default class DissociateDeviceUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(deviceId: string, userId: string): Promise<boolean> {
        // Find user
        const user = await this.userRepository.findOne({
            id: userId
        })

        // User not found
        if (!user) return false


        // Does user possesses the device?
        const isDeviceFromUser = user.devices.some(({ id }: Device) => id === deviceId)
        if (!isDeviceFromUser) return false

        // If true, update the user disconecting the device and return true
        this.userRepository.dissociateDevice(deviceId, userId)

        // Otherwise, return false

        return await this.userRepository.dissociateDevice(deviceId, userId)
    }

}
