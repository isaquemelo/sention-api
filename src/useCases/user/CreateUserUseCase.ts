import bcrypt from 'bcryptjs'
import { IUserRepository } from '../../repositories/interfaces/IUserRepository'
import { IUserDTO } from '../interfaces/IUserDTO'
import User from '../../entities/User'

export default class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: IUserDTO): Promise<User | false> {
        const hash = await bcrypt.hash(data.password, 10)
        const user = new User({ ...data, password: hash })

        return await this.userRepository.save(user)
    }

}
