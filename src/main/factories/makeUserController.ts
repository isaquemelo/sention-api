import UserController from '../../controllers/UserController'

import PrismaUserRepository from '../../repositories/PrismaUserRepository'

import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../../useCases/user/GetUserUseCase'

import PrismaSensorRepository from '../../repositories/PrismaSensorRepository'
import CreateNotificationTriggerUseCase from '../../useCases/user/CreateNotificationTriggerUseCase'

import PrismaActuatorRepository from '../../repositories/PrismaActuatorRepository'

import CreateActuatorTriggerUseCase from '../../useCases/user/CreateActuatorTriggerUseCase'
import DeleteActuatorTriggerUseCase from '../../useCases/user/DeleteActuatorTriggerUseCase'
import UpdateActuatorTriggerUseCase from '../../useCases/user/UpdateActuatorTriggerUseCase'
import DeleteNotificationTriggerUseCase from '../../useCases/user/DeleteNotificationTriggerUseCase'
import UpdateNotificationTriggerUseCase from '../../useCases/user/UpdateNotificationTriggerUseCase'

const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const prismaSensorStorage = new PrismaSensorRepository()
    const prismaActuatorStorage = new PrismaActuatorRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const getUserUseCase = new GetUserUseCase(prismaUserStorage)

    const createActuatorTriggerUseCase = new CreateActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const deleteActuatorTriggerUseCase = new DeleteActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const updateActuatorTriggerUseCase = new UpdateActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)




    return new UserController(
        createUserUseCase, getUserUseCase,
        createActuatorTriggerUseCase, deleteActuatorTriggerUseCase,
        updateActuatorTriggerUseCase,
    )
}

export { makeUserController }
