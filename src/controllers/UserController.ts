
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';

import { IUserDTO } from '../useCases/interfaces/IUserDTO'

import CreateUserUseCase from '../useCases/user/CreateUserUseCase'
import FindUserUseCase from '../useCases/user/FindUserUseCase'
import AssociateDeviceToUserUseCase from '../useCases/user/AssociateDeviceToUserUseCase';
import DissociateDeviceUseCase from '../useCases/user/DissociateDeviceUseCase';
import GetDeviceUseCase from '../useCases/user/GetDeviceUseCase';
import RetrieveSensorsUseCase from '../useCases/user/RetrieveSensorsUseCase'

export default class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase, private findUserUseCase: FindUserUseCase,
        private associateDeviceToUserUseCase: AssociateDeviceToUserUseCase, private dissociateDeviceUseCase: DissociateDeviceUseCase,
        private getDeviceUseCase: GetDeviceUseCase, private retrieveSensorsUseCase: RetrieveSensorsUseCase,
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

    async getDevice(req: Request, res: Response): Promise<Response | undefined> {
        const { userId, deviceId } = req.params

        try {
            const device = await this.getDeviceUseCase.execute(deviceId, userId)
            if (!device) return res.status(StatusCodes.NOT_FOUND).send()
            return res.send(device)
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async associateDevice(req: Request, res: Response): Promise<Response | undefined> {
        const { userId } = req.params
        const { accessCode = "" } = req.body

        try {
            const device = await this.associateDeviceToUserUseCase.execute(accessCode, userId)
            if (device) return res.status(StatusCodes.CREATED).send(device)
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
    }

    async dissociateDevice(req: Request, res: Response): Promise<Response | undefined> {
        const { userId, deviceId } = req.params

        try {
            const allowed = await this.dissociateDeviceUseCase.execute(deviceId, userId)
            if (!allowed) return res.status(StatusCodes.UNAUTHORIZED).send()

            return res.status(StatusCodes.CREATED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async retrieveSensors(req: Request, res: Response): Promise<Response | undefined>{
        const {deviceId, sensorId} = req.params

        try {
            const sensor = await this.retrieveSensorsUseCase.execute(sensorId, deviceId)
            if (!sensor) return res.status(StatusCodes.NOT_FOUND).send()
            return res.send(sensor)
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }
}
