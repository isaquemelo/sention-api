
import DeviceController from '../../controllers/DeviceController'

import PrismaDeviceRepository from '../../repositories/PrismaDeviceRepository'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'

import AssociateDeviceToUserUseCase from '../../useCases/device/AssociateDeviceToUserUseCase'
import CreateDeviceUseCase from '../../useCases/device/CreateDeviceUseCase'
import DissociateDeviceUseCase from '../../useCases/device/DissociateDeviceUseCase'
import GetDeviceUseCase from '../../useCases/device/GetDeviceUseCase'
import UpdateDeviceUseCase from '../../useCases/device/UpdateDeviceUseCase'

const makeDeviceController = (): DeviceController => {
    const prismaDeviceStorage = new PrismaDeviceRepository()
    const prismaUserStorage = new PrismaUserRepository()

    const createDeviceUseCase = new CreateDeviceUseCase(prismaDeviceStorage)
    const associateDeviceToUserUseCase = new AssociateDeviceToUserUseCase(prismaUserStorage, prismaDeviceStorage)
    const dissociateDeviceUseCase = new DissociateDeviceUseCase(prismaUserStorage)
    const getDeviceUseCase = new GetDeviceUseCase(prismaDeviceStorage)
    const updateDeviceUseCase = new UpdateDeviceUseCase(prismaUserStorage,prismaDeviceStorage)

    return new DeviceController(
        createDeviceUseCase, associateDeviceToUserUseCase,
        dissociateDeviceUseCase, getDeviceUseCase, updateDeviceUseCase
    )
}

export { makeDeviceController }
