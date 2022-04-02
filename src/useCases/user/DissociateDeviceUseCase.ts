import { IUserRepository } from '../../repositories/interfaces/IUserRepository'
import Device from '../../entities/Device'

export default class DissociateDeviceUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(groupId: string, userId: string): Promise<boolean> {
        return await this.userRepository.dissociateDevice(groupId, userId)
    }

}
