import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'

import AuthenticateUserUseCase from '../useCases/authetication/AutheticateUserUseCase'

export default class AuthenticationController {
    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) { }

    async authenticate(req: Request, res: Response): Promise<Response | undefined> {
        const { email = "", password = "" } = req.body

        try {
            const auth = await this.authenticateUserUseCase.execute({ email, password })
            if (auth) return res.send(auth)

            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).send()
        }
    }
}
