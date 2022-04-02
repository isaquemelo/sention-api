import UserController from '../../controllers/UserController'
import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import FindUserUseCase from '../../useCases/user/FindUserUseCase'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import AssociateDeviceToUserUseCase from '../../useCases/user/AssociateDeviceToUserUseCase'


const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const findUserUseCase = new FindUserUseCase(prismaUserStorage)
    const associateDeviceToUserUseCase = new AssociateDeviceToUserUseCase(prismaUserStorage)

    return new UserController(createUserUseCase, findUserUseCase, associateDeviceToUserUseCase)
}

export { makeUserController }
