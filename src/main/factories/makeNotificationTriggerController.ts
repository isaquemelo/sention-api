import PrismaSensorRepository from '../../repositories/PrismaSensorRepository'
import PrismaUserRepository from '../../repositories/PrismaUserRepository'

import NotificationTriggerController from '../../controllers/NotificationTriggerController'
import CreateNotificationTriggerUseCase from '../../useCases/user/CreateNotificationTriggerUseCase'
import DeleteNotificationTriggerUseCase from '../../useCases/user/DeleteNotificationTriggerUseCase'
import UpdateNotificationTriggerUseCase from '../../useCases/user/UpdateNotificationTriggerUseCase'
import GetNotificationTriggerUseCase from '../../useCases/user/GetNotificationTriggerUseCase'

const makeNotificationTriggerController = (): NotificationTriggerController => {
    const prismaSensorStorage = new PrismaSensorRepository()
    const prismaUserStorage = new PrismaUserRepository()

    const createNotificationTriggerUseCase = new CreateNotificationTriggerUseCase(prismaSensorStorage, prismaUserStorage)
    const deleteNotificationTriggerUseCase = new DeleteNotificationTriggerUseCase(prismaSensorStorage, prismaUserStorage)
    const updateNotificationTriggerUseCase = new UpdateNotificationTriggerUseCase(prismaSensorStorage, prismaUserStorage)
    const getNotificationTriggerUseCase = new GetNotificationTriggerUseCase(prismaSensorStorage, prismaUserStorage)

    return new NotificationTriggerController(
        createNotificationTriggerUseCase, deleteNotificationTriggerUseCase,
        updateNotificationTriggerUseCase, getNotificationTriggerUseCase
    )
}

export { makeNotificationTriggerController }
