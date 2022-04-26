import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ISensorDataDTO } from '../useCases/interfaces/ISensorDataDTO'
import { ISensorDTO } from '../useCases/interfaces/ISensorDTO'
import { ISensorsBulkDataDTO } from '../useCases/interfaces/ISensorsBulkDataDTO'

import CreateSensorDataUseCase from '../useCases/user/CreateSensorDataUseCase'
import CreateSensorUseCase from '../useCases/user/CreateSensorUseCase'
import DeleteSensorUseCase from '../useCases/user/DeleteSensorUseCase'
import GetSensorDataUseCase from '../useCases/user/GetSensorDataUseCase'
import GetSensorUseCase from '../useCases/user/GetSensorUseCase'
import UpdateSensorUseCase from '../useCases/user/UpdateSensorUseCase'


export default class SensorController {
    constructor(
        private getSensorUseCase: GetSensorUseCase, private createSensorUseCase: CreateSensorUseCase,
        private getSensorDataUseCase: GetSensorDataUseCase, private createSensorDataUseCase: CreateSensorDataUseCase,
        private updateSensorUseCase: UpdateSensorUseCase, private deleteSensorUseCase: DeleteSensorUseCase,) { }

    async getSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { sensorId, userId } = req.params

        try {
            const sensor = await this.getSensorUseCase.execute(sensorId, userId)
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
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async getSensorData(req: Request, res: Response): Promise<Response | undefined> {
        const { userId, sensorId } = req.params
        const page = <string>req.query.page ?? '1'
        const day = <string>req.query.day ?? new Date().toString()

        try {
            const sensorData = await this.getSensorDataUseCase.execute(sensorId, userId, page, day)
            if (sensorData) return res.send(sensorData)

            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveSensorData(req: Request, res: Response): Promise<Response | undefined> {
        const { userId, sensorId } = req.params
        const body: ISensorDataDTO = req.body

        try {
            const sensorData = await this.createSensorDataUseCase.execute(body, sensorId, userId)
            if (sensorData) return res.status(StatusCodes.CREATED).send(sensorData)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async deleteSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { sensorId, userId } = req.params

        try {
            const allowed = await this.deleteSensorUseCase.execute(sensorId, userId)
            if (!allowed) return res.status(StatusCodes.UNAUTHORIZED).send()
            return res.send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async updateSensor(req: Request, res: Response): Promise<Response | undefined> {
        const { sensorId, userId } = req.params
        const body: ISensorDTO = req.body

        try {
            const sensor = await this.updateSensorUseCase.execute(body, sensorId, userId)
            if (sensor) return res.status(StatusCodes.CREATED).send(sensor)
            return res.status(StatusCodes.UNAUTHORIZED).send()
        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

    async saveBulkSensorData(req: Request, res: Response): Promise<Response | undefined> {
        const { userId } = req.params
        const body: ISensorsBulkDataDTO = req.body

        try {
            const savedSensorsData: any[] = []
            const promises = Promise.all(body.data.map(async sensorDataItem => {
                const sensorData = await this.createSensorDataUseCase.execute(sensorDataItem, sensorDataItem.id || '', userId)

                if (!sensorData) res.status(StatusCodes.UNAUTHORIZED).send()
                savedSensorsData.push(sensorData)

                return sensorData
            }))

            promises
                .then(() => res.status(StatusCodes.CREATED).send(savedSensorsData))
                .finally(() => {
                    return res.status(StatusCodes.UNAUTHORIZED).send()
                })

        } catch (error) {
            console.error(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
        }
    }

}
