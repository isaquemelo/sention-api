import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IActuatorDTO } from '../useCases/interfaces/IActuatorDTO'

import CreateActuatorUseCase from '../useCases/user/CreateActuatorUseCase'
import DeleteActuatorUseCase from '../useCases/user/DeleteActuatorUseCase'
import getActuatorUseCase from '../useCases/user/GetActuatorUseCase'
import UpdateActuatorUseCase from '../useCases/user/UpdateActuatorUseCase'

export default class ActuatorController {
    constructor(
        private createActuatorUseCase: CreateActuatorUseCase, private deleteActuatorUseCase: DeleteActuatorUseCase,
        private updateActuatorUseCase: UpdateActuatorUseCase, private getActuatorUseCase: getActuatorUseCase) { }

    async deleteActuator(req: Request, res: Response): Promise<Response | undefined> {
        const { actuatorId, userId } = req.params

        try {
            const allowed = await this.deleteActuatorUseCase.execute(actuatorId, userId)
            if (!allowed) return res.status(StatusCodes.UNAUTHORIZED).send()

            return res.send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveActuator(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, userId } = req.params
        const body: IActuatorDTO = req.body

        try {
            const actuator = await this.createActuatorUseCase.execute(body, deviceId, userId)
            if (actuator) return res.status(StatusCodes.CREATED).send(actuator)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async updateActuator(req: Request, res: Response): Promise<Response | undefined> {
        const { actuatorId, userId } = req.params
        const body: IActuatorDTO = req.body

        try {
            const actuator = await this.updateActuatorUseCase.execute(body, actuatorId, userId)
            if (actuator) return res.send(actuator)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async getActuator(req: Request, res: Response): Promise<Response | undefined> {
        const { actuatorId, userId } = req.params

        try {
            const sensor = await this.getActuatorUseCase.execute(actuatorId, userId)
            if (!sensor) return res.status(StatusCodes.NOT_FOUND).send()
            return res.send(sensor)
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

}
