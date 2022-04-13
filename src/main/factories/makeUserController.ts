import UserController from '../../controllers/UserController'

import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import PrismaDeviceRepository from '../../repositories/PrismaDeviceRepository'

import CreateUserUseCase from '../../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../../useCases/user/GetUserUseCase'

import AssociateDeviceToUserUseCase from '../../useCases/user/AssociateDeviceToUserUseCase'
import DissociateDeviceUseCase from '../../useCases/user/DissociateDeviceUseCase'

import CreateSensorDataUseCase from '../../useCases/user/CreateSensorDataUseCase'
import PrismaSensorRepository from '../../repositories/PrismaSensorRepository'
import DeleteSensorUseCase from '../../useCases/user/DeleteSensorUseCase'
import GetSensorDataUseCase from '../../useCases/user/GetSensorDataUseCase'
import CreateSensorUseCase from '../../useCases/user/CreateSensorUseCase'
import GetSensorUseCase from '../../useCases/user/GetSensorUseCase'
import UpdateSensorUseCase from '../../useCases/user/UpdateSensorUseCase'
import CreateNotificationTriggerUseCase from '../../useCases/user/CreateNotificationTriggerUseCase'

import GetDeviceUseCase from '../../useCases/user/GetDeviceUseCase'

import CreateActuatorUseCase from '../../useCases/user/CreateActuatorUseCase'
import DeleteActuatorUseCase from '../../useCases/user/DeleteActuatorUseCase'

import PrismaActuatorRepository from '../../repositories/PrismaActuatorRepository'

import CreateActuatorTriggerUseCase from '../../useCases/user/CreateActuatorTriggerUseCase'
import DeleteActuatorTriggerUseCase from '../../useCases/user/DeleteActuatorTriggerUseCase'
import UpdateActuatorUseCase from '../../useCases/user/UpdateActuatorUseCase'
import UpdateActuatorTriggerUseCase from '../../useCases/user/UpdateActuatorTriggerUseCase'

const makeUserController = (): UserController => {
    const prismaUserStorage = new PrismaUserRepository()
    const prismaDeviceStorage = new PrismaDeviceRepository()
    const prismaSensorStorage = new PrismaSensorRepository()
    const prismaActuatorStorage = new PrismaActuatorRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUserStorage)
    const getUserUseCase = new GetUserUseCase(prismaUserStorage)

    const associateDeviceToUserUseCase = new AssociateDeviceToUserUseCase(prismaUserStorage, prismaDeviceStorage)
    const dissociateDeviceUseCase = new DissociateDeviceUseCase(prismaUserStorage)

    const getDeviceUseCase = new GetDeviceUseCase(prismaDeviceStorage)

    const getSensorUseCase = new GetSensorUseCase(prismaSensorStorage, prismaDeviceStorage)
    const createSensorUseCase = new CreateSensorUseCase(prismaSensorStorage, prismaUserStorage)
    const deleteSensorUseCase = new DeleteSensorUseCase(prismaSensorStorage, prismaUserStorage)
    const updateSensorUseCase = new UpdateSensorUseCase(prismaSensorStorage, prismaDeviceStorage)

    const getSensorDataUseCase = new GetSensorDataUseCase(prismaSensorStorage, prismaDeviceStorage)

    const createSensorDataUseCase = new CreateSensorDataUseCase(prismaSensorStorage, prismaUserStorage)

    const createActuatorUseCase = new CreateActuatorUseCase(prismaActuatorStorage, prismaUserStorage)
    const deleteActuatorUseCase = new DeleteActuatorUseCase(prismaActuatorStorage, prismaUserStorage)

    const createActuatorTriggerUseCase = new CreateActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const deleteActuatorTriggerUseCase = new DeleteActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const updateActuatorTriggerUseCase = new UpdateActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)

    const updateActuatorUseCase = new UpdateActuatorUseCase(prismaActuatorStorage, prismaUserStorage)

    const createNotificationTriggerUseCase = new CreateNotificationTriggerUseCase(prismaSensorStorage, prismaUserStorage)


    return new UserController(
        createUserUseCase, getUserUseCase,
        associateDeviceToUserUseCase, dissociateDeviceUseCase,
        getDeviceUseCase, getSensorUseCase,
        createSensorUseCase, getSensorDataUseCase,
        createSensorDataUseCase, deleteSensorUseCase,
        createActuatorUseCase, deleteActuatorUseCase,
        createActuatorTriggerUseCase, deleteActuatorTriggerUseCase,
        updateSensorUseCase, updateActuatorUseCase, createNotificationTriggerUseCase,
        updateActuatorTriggerUseCase
    )
}

export { makeUserController }
