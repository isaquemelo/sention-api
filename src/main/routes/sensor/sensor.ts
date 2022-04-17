import { Router } from 'express'

import SensorController from '../../../controllers/SensorController'

import { makeSensorController } from '../../factories/makeSensorController'

import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class SensorRoutes {
    public static buildRoutes(router: Router) {
        const sensorController: SensorController = makeSensorController()

        router.get('/user/devices/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.getSensor(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/', AuthenticationdMiddleware, (req, res) => {
            return sensorController.saveSensor(req, res)
        })

        router.delete('/user/devices/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.deleteSensor(req, res)
        })

        router.put('/user/devices/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.updateSensor(req, res)
        })

        router.get('/user/devices/sensors/:sensorId/data', AuthenticationdMiddleware, (req, res) => {
            return sensorController.getSensorData(req, res)
        })

        router.post('/user/devices/sensors/:sensorId/data', AuthenticationdMiddleware, (req, res) => {
            return sensorController.saveSensorData(req, res)
        })

        router.post('/user/devices/sensors/data', AuthenticationdMiddleware, (req, res) => {
            return sensorController.saveBulkSensorData(req, res)
        })
    }
}
