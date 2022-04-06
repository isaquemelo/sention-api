import UserController from '../../controllers/UserController'
import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../../useCases/user/GetUserUseCase'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import AssociateDeviceToUserUseCase from '../../useCases/user/AssociateDeviceToUserUseCase'
import DissociateDeviceUseCase from '../../useCases/user/DissociateDeviceUseCase'
import PrismaDeviceRepository from '../../repositories/PrismaDeviceRepository'
import GetDeviceUseCase from '../../useCases/user/GetDeviceUseCase'
import GetSensorUseCase from '../../useCases/user/GetSensorUseCase'
import PrismaSensorRepository from '../../repositories/PrismaSensorRepository'


const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const prismaDeviceStorage = new PrismaDeviceRepository()
    const prismaSensorStorage = new PrismaSensorRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const getUserUseCase = new GetUserUseCase(prismaUserStorage)

    const associateDeviceToUserUseCase = new AssociateDeviceToUserUseCase(prismaUserStorage, prismaDeviceStorage)
    const dissociateDeviceUseCase = new DissociateDeviceUseCase(prismaUserStorage)

    const getDeviceUseCase = new GetDeviceUseCase(prismaDeviceStorage)
    const getSensorUseCase = new GetSensorUseCase(prismaSensorStorage)

    return new UserController(
        createUserUseCase, getUserUseCase,
        associateDeviceToUserUseCase, dissociateDeviceUseCase,
        getDeviceUseCase, getSensorUseCase
    )
}

export { makeUserController }
