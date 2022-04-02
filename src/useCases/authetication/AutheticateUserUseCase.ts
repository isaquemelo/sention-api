import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errors } from '../../constants/errorMessages'
import User from '../../entities/User'
import { IUserRepository } from '../../repositories/interfaces/user/IUserRepository'
import { IAutheticate } from '../interfaces/IAutheticate'

export default class AuthenticateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: IAutheticate): Promise<Object | false> {
        const user = await this.userRepository.findOne({ email: data.email })
        // const hash = await bcrypt.hash(data.password, 10)

        if (user) {
            if (!await bcrypt.compare(data.password, user.password)) {
                // Invalid login
                return false
            }

            const token = jwt.sign({ id: user.id }, <string>process.env.JWT_SECRET, {
                expiresIn: 1296000 // 15 days
            })

            return { ...user, password: undefined, token }
        }

        throw new Error(errors.USER_NOT_FOUND)
    }

}
