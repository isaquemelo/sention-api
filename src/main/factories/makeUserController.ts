import UserController from '../../controllers/UserController'
import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import FindUserUseCase from '../../useCases/user/FindUserUseCase'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import AssociateDeviceToUserUseCase from '../../useCases/user/AssociateDeviceToUserUseCase'
import DissociateDeviceUseCase from '../../useCases/user/DissociateDeviceUseCase'
import PrismaDeviceRepository from '../../repositories/PrismaDeviceRepository'


const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const primaDeviceStorage = new PrismaDeviceRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const findUserUseCase = new FindUserUseCase(prismaUserStorage)
    const associateDeviceToUserUseCase = new AssociateDeviceToUserUseCase(prismaUserStorage, primaDeviceStorage)

    const dissociateDeviceUseCase = new DissociateDeviceUseCase(prismaUserStorage)

    return new UserController(
        createUserUseCase, findUserUseCase,
        associateDeviceToUserUseCase, dissociateDeviceUseCase
    )
}

export { makeUserController }
