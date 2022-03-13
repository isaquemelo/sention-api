import { IUserRepository } from '../../repositories/interfaces/IUserRepository'
import { IUserDTO } from '../interfaces/IUserDTO'
import User from '../../entities/User'

export default class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: IUserDTO): Promise<User | false> {
        const user = new User({ ...data })
        return await this.userRepository.save(user)
    }

}
