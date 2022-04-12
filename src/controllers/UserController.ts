
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { IUserDTO } from '../useCases/interfaces/IUserDTO'
import { ISensorDTO } from '../useCases/interfaces/ISensorDTO'
import { ISensorDataDTO } from '../useCases/interfaces/ISensorDataDTO'

import CreateUserUseCase from '../useCases/user/CreateUserUseCase'
import GetUserUseCase from '../useCases/user/GetUserUseCase'

import AssociateDeviceToUserUseCase from '../useCases/user/AssociateDeviceToUserUseCase'
import DissociateDeviceUseCase from '../useCases/user/DissociateDeviceUseCase'

import GetDeviceUseCase from '../useCases/user/GetDeviceUseCase'

import GetSensorUseCase from '../useCases/user/GetSensorUseCase'
import CreateSensorUseCase from '../useCases/user/CreateSensorUseCase'
import GetSensorDataUseCase from '../useCases/user/GetSensorDataUseCase'
import CreateSensorDataUseCase from '../useCases/user/CreateSensorDataUseCase'
import DeleteSensorUseCase from '../useCases/user/DeleteSensorUseCase'
import UpdateSensorUseCase from '../useCases/user/UpdateSensorUseCase'

export default class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase, private getUserUseCase: GetUserUseCase,
        private associateDeviceToUserUseCase: AssociateDeviceToUserUseCase, private dissociateDeviceUseCase: DissociateDeviceUseCase,
        private getDeviceUseCase: GetDeviceUseCase, private getSensorUseCase: GetSensorUseCase,
        private createSensorUseCase: CreateSensorUseCase, private deleteSensorUseCase: DeleteSensorUseCase, 
        private updateSensorUseCase: UpdateSensorUseCase, private getSensorDataUseCase: GetSensorDataUseCase, 
        private createSensorDataUseCase: CreateSensorDataUseCase
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

    async getSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, sensorId, userId } = req.params

        try {
            const sensor = await this.getSensorUseCase.execute(sensorId, deviceId, userId)
            if (!sensor) return res.status(StatusCodes.NOT_FOUND).send()
            return res.send(sensor)
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, userId } = req.params
        const body: ISensorDTO = req.body

        try {
            const sensor = await this.createSensorUseCase.execute(body, deviceId, userId)
            if (sensor) return res.status(StatusCodes.CREATED).send(sensor)
            return res.status(StatusCodes.NOT_FOUND).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async deleteSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, sensorId, userId} = req.params

        try {
            const allowed = await this.deleteSensorUseCase.execute(sensorId, deviceId, userId)
            if (!allowed) return res.status(StatusCodes.UNAUTHORIZED).send()
            return res.send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async updateSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, sensorId, userId} = req.params
        const body: ISensorDTO = req.body

        try {
            const sensor = await this.updateSensorUseCase.execute(body, sensorId, deviceId, userId)
            if (sensor) return res.status(StatusCodes.CREATED).send(sensor)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async getSensorData(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, userId, sensorId } = req.params
        const page = <string>req.query.page ?? '1'
        const day = <string>req.query.day ?? new Date().toString()

        try {
            const sensorData = await this.getSensorDataUseCase.execute(sensorId, deviceId, userId, page, day)

            if (sensorData) return res.send(sensorData)
            return res.status(StatusCodes.NOT_FOUND).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveSensorData(req: Request, res: Response): Promise<Response | undefined> {
        const { deviceId, userId, sensorId } = req.params
        const body: ISensorDataDTO = req.body

        try {
            const sensorData = await this.createSensorDataUseCase.execute(body, deviceId, sensorId, userId)
            if (sensorData) return res.status(StatusCodes.CREATED).send(sensorData)
            return res.status(StatusCodes.NOT_FOUND).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }
}
