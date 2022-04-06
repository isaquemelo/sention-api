import UserController from '../../controllers/UserController'
import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import FindUserUseCase from '../../useCases/user/FindUserUseCase'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import AssociateDeviceToUserUseCase from '../../useCases/user/AssociateDeviceToUserUseCase'
import DissociateDeviceUseCase from '../../useCases/user/DissociateDeviceUseCase'
import PrismaDeviceRepository from '../../repositories/PrismaDeviceRepository'
import GetDeviceUseCase from '../../useCases/user/GetDeviceUseCase'
import GetSensorsUseCase from '../../useCases/user/GetSensorsUseCase'
import PrismaSensorRepository from '../../repositories/PrismaSensorRepository'


const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const prismaDeviceStorage = new PrismaDeviceRepository()
    const prismaSensorStorage = new PrismaSensorRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const findUserUseCase = new FindUserUseCase(prismaUserStorage)
    const associateDeviceToUserUseCase = new AssociateDeviceToUserUseCase(prismaUserStorage, prismaDeviceStorage)
    const dissociateDeviceUseCase = new DissociateDeviceUseCase(prismaUserStorage)
    const getDeviceUseCase = new GetDeviceUseCase(prismaDeviceStorage)
    const getSensorsUseCase = new GetSensorsUseCase(prismaSensorStorage)

    return new UserController(
        createUserUseCase, findUserUseCase,
        associateDeviceToUserUseCase, dissociateDeviceUseCase,
        getDeviceUseCase, getSensorsUseCase
    )
}

export { makeUserController }
