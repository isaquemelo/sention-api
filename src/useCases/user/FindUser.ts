import { IUserRepository } from '../../repositories/interfaces/IUserRepository'
import { IUserDTO } from '../interfaces/IUserDTO'
import User from '../../entities/User'

export default class FindUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<User | false> {
        return await this.userRepository.findOne(id)
    }

}
