
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';

import { IUserDTO } from '../useCases/interfaces/IUserDTO'

import CreateUserUseCase from '../useCases/user/CreateUserUseCase'
import FindUserUseCase from '../useCases/user/FindUserUseCase'
import AssociateDeviceToUserUseCase from '../useCases/user/AssociateDeviceToUserUseCase';

export default class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase, private findUserUseCase: FindUserUseCase,
        private associateDeviceToUser: AssociateDeviceToUserUseCase,

    ) { }

    async find(req: Request, res: Response): Promise<Response | undefined> {
        const userId = req.params.id

        try {
            const user = await this.findUserUseCase.execute(userId)
            if (user) return res.send({ ...user, password: undefined })
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }

        return res.status(StatusCodes.NOT_FOUND).send()
    }

    async save(req: Request, res: Response): Promise<Response | undefined> {
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

    async associateDevice(req: Request, res: Response): Promise<Response | undefined> {
        const { userId } = req.params
        const { accessCode = "" } = req.body

        try {
            const device = await this.associateDeviceToUser.execute(accessCode, userId)
            if (device) return res.status(StatusCodes.CREATED).send(device)
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }
}
