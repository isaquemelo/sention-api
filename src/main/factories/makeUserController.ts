import UserController from '../../controllers/UserController'

import PrismaUserRepository from '../../repositories/PrismaUserRepository'

import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../../useCases/user/GetUserUseCase'

const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const getUserUseCase = new GetUserUseCase(prismaUserStorage)

    return new UserController(
        createUserUseCase, getUserUseCase,
    )
}

export { makeUserController }
