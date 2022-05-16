
import ActuatorController from '../../controllers/ActuatorController'

import PrismaActuatorRepository from '../../repositories/PrismaActuatorRepository'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'


import CreateActuatorUseCase from '../../useCases/user/CreateActuatorUseCase'
import DeleteActuatorUseCase from '../../useCases/user/DeleteActuatorUseCase'
import GetActuatorUseCase from '../../useCases/user/GetActuatorUseCase'
import UpdateActuatorUseCase from '../../useCases/user/UpdateActuatorUseCase'

const makeActuatorController = (): ActuatorController => {
    const prismaActuatorStorage = new PrismaActuatorRepository()
    const prismaUserStorage = new PrismaUserRepository()

    const createActuatorUseCase = new CreateActuatorUseCase(prismaActuatorStorage, prismaUserStorage)
    const deleteActuatorUseCase = new DeleteActuatorUseCase(prismaActuatorStorage, prismaUserStorage)
    const updateActuatorUseCase = new UpdateActuatorUseCase(prismaActuatorStorage, prismaUserStorage)
    const getActuatorUseCase = new GetActuatorUseCase(prismaActuatorStorage, prismaUserStorage)

    return new ActuatorController(
        createActuatorUseCase, deleteActuatorUseCase,
        updateActuatorUseCase, getActuatorUseCase
    )
}

export { makeActuatorController }
