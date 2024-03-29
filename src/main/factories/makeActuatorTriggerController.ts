
import ActuatorTriggerController from '../../controllers/ActuatorTriggerController'
import PrismaActuatorRepository from '../../repositories/PrismaActuatorRepository'

import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import CreateActuatorTriggerUseCase from '../../useCases/user/CreateActuatorTriggerUseCase'
import DeleteActuatorTriggerUseCase from '../../useCases/user/DeleteActuatorTriggerUseCase'
import GetActuatorTriggerUseCase from '../../useCases/user/GetActuatorTriggerUseCase'
import UpdateActuatorTriggerUseCase from '../../useCases/user/UpdateActuatorTriggerUseCase'



const makeActuatorTriggerController = (): ActuatorTriggerController => {
    const prismaActuatorStorage = new PrismaActuatorRepository()
    const prismaUserStorage = new PrismaUserRepository()

    const createActuatorTriggerUseCase = new CreateActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const deleteActuatorTriggerUseCase = new DeleteActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const updateActuatorTriggerUseCase = new UpdateActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)
    const getActuatorTriggerUseCase = new GetActuatorTriggerUseCase(prismaActuatorStorage, prismaUserStorage)

    return new ActuatorTriggerController(
        createActuatorTriggerUseCase,
        deleteActuatorTriggerUseCase,
        updateActuatorTriggerUseCase,
        getActuatorTriggerUseCase
    )
}

export { makeActuatorTriggerController }
