import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { IUserDTO } from '../useCases/interfaces/IUserDTO'
import { ISensorDTO } from '../useCases/interfaces/ISensorDTO'
import { ISensorDataDTO } from '../useCases/interfaces/ISensorDataDTO'
import { IActuatorDTO } from '../useCases/interfaces/IActuatorDTO'
import { IActuatorTriggerDTO } from '../useCases/interfaces/IActuatorTriggerDTO'
import { INotificationTriggerDTO } from '../useCases/interfaces/INotificationTriggerDTO'

import CreateUserUseCase from '../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../useCases/user/GetUserUseCase'


import CreateNotificationTriggerUseCase from '../useCases/user/CreateNotificationTriggerUseCase'

import CreateActuatorTriggerUseCase from '../useCases/user/CreateActuatorTriggerUseCase'
import DeleteActuatorTriggerUseCase from '../useCases/user/DeleteActuatorTriggerUseCase'
import UpdateActuatorTriggerUseCase from '../useCases/user/UpdateActuatorTriggerUseCase'
import DeleteNotificationTriggerUseCase from '../useCases/user/DeleteNotificationTriggerUseCase'
import UpdateNotificationTriggerUseCase from '../useCases/user/UpdateNotificationTriggerUseCase'


export default class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase, private getUserUseCase: GetUserUseCase,
        private createActuatorTriggerUseCase: CreateActuatorTriggerUseCase, private deleteActuatorTriggerUseCase: DeleteActuatorTriggerUseCase,
        private createNotificationTriggerUseCase: CreateNotificationTriggerUseCase, private updateActuatorTriggerUseCase: UpdateActuatorTriggerUseCase,
        private deleteNotificationTriggerUseCase: DeleteNotificationTriggerUseCase, private updateNotificationTriggerUseCase: UpdateNotificationTriggerUseCase
    ) { }

    async getUser(req: Request, res: Response): Promise<Response | undefined> {
        const userId = req.params.id

        try {
            const user = await this.getUserUseCase.execute(userId)
            if (user) return res.send({ ...user, password: undefined })
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }

        return res.status(StatusCodes.NOT_FOUND).send()
    }

    async saveUser(req: Request, res: Response): Promise<Response | undefined> {
        const params: IUserDTO = req.body

        try {
            const user = await this.createUserUseCase.execute(params)
            if (user) return res.status(StatusCodes.CREATED).send({ ...user, password: undefined })
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }

    async updateActuatorTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { triggerId, userId } = req.params
        const body: IActuatorTriggerDTO = req.body

        try {
            const actuatorTrigger = await this.updateActuatorTriggerUseCase.execute(body, triggerId, userId)
            if (actuatorTrigger) return res.send(actuatorTrigger)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async deleteActuatorTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, triggerId, userId } = req.params

        try {
            const allowed = await this.deleteActuatorTriggerUseCase.execute(triggerId, userId)
            if (!allowed) return res.status(StatusCodes.UNAUTHORIZED).send()

            return res.send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveActuatorTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, actuatorId, userId } = req.params
        const body: IActuatorTriggerDTO = req.body

        try {
            const actuatorTrigger = await this.createActuatorTriggerUseCase.execute(body, actuatorId, userId)
            if (actuatorTrigger) return res.status(StatusCodes.CREATED).send(actuatorTrigger)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveNotificationTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, sensorId, userId } = req.params
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
        const { deviceId, notificationTriggerId, userId } = req.params

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
}
