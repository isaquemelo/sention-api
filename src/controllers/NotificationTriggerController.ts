import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { INotificationTriggerDTO } from '../useCases/interfaces/INotificationTriggerDTO'
import CreateNotificationTriggerUseCase from '../useCases/user/CreateNotificationTriggerUseCase'
import DeleteNotificationTriggerUseCase from '../useCases/user/DeleteNotificationTriggerUseCase'
import GetNotificationTriggerUseCase from '../useCases/user/GetNotificationTriggerUseCase'
import UpdateNotificationTriggerUseCase from '../useCases/user/UpdateNotificationTriggerUseCase'


export default class NotificationTriggerController {
    constructor(
        private createNotificationTriggerUseCase: CreateNotificationTriggerUseCase,
        private deleteNotificationTriggerUseCase: DeleteNotificationTriggerUseCase,
        private updateNotificationTriggerUseCase: UpdateNotificationTriggerUseCase,
        private getNotificationTriggerUseCase: GetNotificationTriggerUseCase) { }

    async saveNotificationTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { sensorId, userId } = req.params
        const body: INotificationTriggerDTO = req.body

        try {
            const notificationTrigger = await this.createNotificationTriggerUseCase.execute(body, sensorId, userId)
            if (notificationTrigger) return res.status(StatusCodes.CREATED).send(notificationTrigger)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }


    async deleteNotificationTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { notificationTriggerId, userId } = req.params

        try {
            const allowed = await this.deleteNotificationTriggerUseCase.execute(notificationTriggerId, userId)
            if (!allowed) return res.status(StatusCodes.UNAUTHORIZED).send()

            return res.send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async updateNotificationTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { notificationTriggerId, userId } = req.params
        const body: INotificationTriggerDTO = req.body

        try {
            const notificationTrigger = await this.updateNotificationTriggerUseCase.execute(body, notificationTriggerId, userId)
            if (notificationTrigger) return res.send(notificationTrigger)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async getNotificationTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { notificationTriggerId, userId } = req.params

        try {
            const notificationTrigger = await this.getNotificationTriggerUseCase.execute(notificationTriggerId, userId)
            if (notificationTrigger) return res.send(notificationTrigger)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

}
