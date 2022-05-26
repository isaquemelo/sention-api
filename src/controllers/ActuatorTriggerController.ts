import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IActuatorTriggerDTO } from '../useCases/interfaces/IActuatorTriggerDTO'
import CreateActuatorTriggerUseCase from '../useCases/user/CreateActuatorTriggerUseCase'
import DeleteActuatorTriggerUseCase from '../useCases/user/DeleteActuatorTriggerUseCase'
import GetActuatorTriggerUseCase from '../useCases/user/GetActuatorTriggerUseCase'
import UpdateActuatorTriggerUseCase from '../useCases/user/UpdateActuatorTriggerUseCase'


export default class ActuatorTriggerController {
    constructor(
        private createActuatorTriggerUseCase: CreateActuatorTriggerUseCase,
        private deleteActuatorTriggerUseCase: DeleteActuatorTriggerUseCase,
        private updateActuatorTriggerUseCase: UpdateActuatorTriggerUseCase,
        private getActuatorTriggerUseCase: GetActuatorTriggerUseCase) { }

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
        const { triggerId, userId } = req.params

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
        const { actuatorId, userId } = req.params
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

    async getActuatorTrigger(req: Request, res: Response): Promise<Response | undefined> {
        const { actuatorTriggerId, userId } = req.params

        try {
            const actuatorTrigger = await this.getActuatorTriggerUseCase.execute(actuatorTriggerId, userId)
            if (actuatorTrigger) return res.send(actuatorTrigger)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }
}
