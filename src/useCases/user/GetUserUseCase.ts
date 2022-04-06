import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import User from '../../entities/User'

export default class GetUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<User | false> {
        return await this.userRepository.findOne({ id })
    }

}
