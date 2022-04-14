import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { IUserDTO } from '../useCases/interfaces/IUserDTO'

import CreateUserUseCase from '../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../useCases/user/GetUserUseCase'
export default class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase, private getUserUseCase: GetUserUseCase,
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
}
