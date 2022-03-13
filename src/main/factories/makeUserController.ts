import UserController from '../../controllers/UserController'
import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import FindUserUseCase from '../../useCases/user/FindUser'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'


const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const findUserUseCase = new FindUserUseCase(prismaUserStorage)



    return new UserController(createUserUseCase, findUserUseCase)
}

export { makeUserController }
