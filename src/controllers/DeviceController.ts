
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CreateDeviceUseCase from '../useCases/device/CreateDeviceUseCase'

export default class DeviceController {
    constructor(private createDeviceUseCase: CreateDeviceUseCase) { }

    async createDevice(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const device = await this.createDeviceUseCase.execute()
            if (!device) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
            return res.send(device)
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }
}
