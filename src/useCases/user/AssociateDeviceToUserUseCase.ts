import { IUserRepository } from '../../repositories/interfaces/IUserRepository'
import Device from '../../entities/Device'

export default class AssociateDeviceToUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(accessCode: string, userId: string): Promise<Device | false> {
        return await this.userRepository.associateDeviceToUser(accessCode, userId)
    }

}
