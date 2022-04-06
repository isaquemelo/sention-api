
import DeviceController from '../../controllers/DeviceController'
import PrismaDeviceRepository from '../../repositories/PrismaDeviceRepository'
import CreateDeviceUseCase from '../../useCases/device/CreateDeviceUseCase'

const makeDeviceController = (): DeviceController => {
    const prismaDeviceStorage = new PrismaDeviceRepository()

    const createDeviceUseCase = new CreateDeviceUseCase(prismaDeviceStorage)

    return new DeviceController(
        createDeviceUseCase,
    )
}

export { makeDeviceController }
