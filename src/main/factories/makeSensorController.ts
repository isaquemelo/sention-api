import SensorController from '../../controllers/SensorController'

import PrismaSensorRepository from '../../repositories/PrismaSensorRepository'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'

import CreateSensorDataUseCase from '../../useCases/user/CreateSensorDataUseCase'
import CreateSensorUseCase from '../../useCases/user/CreateSensorUseCase'
import DeleteSensorUseCase from '../../useCases/user/DeleteSensorUseCase'
import GetSensorDataUseCase from '../../useCases/user/GetSensorDataUseCase'
import GetSensorUseCase from '../../useCases/user/GetSensorUseCase'
import UpdateSensorUseCase from '../../useCases/user/UpdateSensorUseCase'

const makeSensorController = (): SensorController => {
    const prismaSensorStorage = new PrismaSensorRepository()
    const prismaUserStorage = new PrismaUserRepository()

    const getSensorUseCase = new GetSensorUseCase(prismaSensorStorage, prismaUserStorage)
    const createSensorUseCase = new CreateSensorUseCase(prismaSensorStorage, prismaUserStorage)
    const deleteSensorUseCase = new DeleteSensorUseCase(prismaSensorStorage, prismaUserStorage)
    const updateSensorUseCase = new UpdateSensorUseCase(prismaSensorStorage, prismaUserStorage)
    const getSensorDataUseCase = new GetSensorDataUseCase(prismaSensorStorage, prismaUserStorage)
    const createSensorDataUseCase = new CreateSensorDataUseCase(prismaSensorStorage, prismaUserStorage)

    return new SensorController(
        getSensorUseCase, createSensorUseCase,
        getSensorDataUseCase, createSensorDataUseCase,
        updateSensorUseCase, deleteSensorUseCase
    )
}

export { makeSensorController }
