import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import CreateDeviceUseCase from '../useCases/device/CreateDeviceUseCase'
import AssociateDeviceToUserUseCase from '../useCases/device/AssociateDeviceToUserUseCase'
import DissociateDeviceUseCase from '../useCases/device/DissociateDeviceUseCase'
import GetDeviceUseCase from '../useCases/device/GetDeviceUseCase'
import UpdateDeviceUseCase from '../useCases/device/UpdateDeviceUseCase'
import { IDeviceDTO } from '../useCases/interfaces/IDeviceDTO'

export default class DeviceController {
    constructor(private createDeviceUseCase: CreateDeviceUseCase, private associateDeviceToUserUseCase: AssociateDeviceToUserUseCase,
        private dissociateDeviceUseCase: DissociateDeviceUseCase, private getDeviceUseCase: GetDeviceUseCase, private updateDeviceUseCase: UpdateDeviceUseCase) { }

    async createDevice(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const device = await this.createDeviceUseCase.execute()
            if (!device) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
            return res.send(device)
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async associateDevice(req: Request, res: Response): Promise<Response | undefined> {
        const { userId } = req.params
        const { accessCode = '' } = req.body

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

            return res.send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
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

    async updateDevice(req: Request, res: Response): Promise<Response | undefined> {
        const { userId, deviceId } = req.params
        const body:IDeviceDTO = req.body

        console.log(userId, deviceId)
        console.log(req.body)

        try {
            const sensor = await this.updateDeviceUseCase.execute(body, deviceId, userId)
            if (sensor) return res.status(StatusCodes.CREATED).send(sensor)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }
}
