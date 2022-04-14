import { Router } from 'express'

import SensorController from '../../../controllers/SensorController'

import { makeSensorController } from '../../factories/makeSensorController'

import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class SensorRoutes {
    public static buildRoutes(router: Router) {
        const sensorController: SensorController = makeSensorController()

        router.get('/user/devices/:deviceId/sensors/:sensorId/data', AuthenticationdMiddleware, (req, res) => {
            return sensorController.getSensorData(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/:sensorId/data', AuthenticationdMiddleware, (req, res) => {
            return sensorController.saveSensorData(req, res)
        })

        router.get('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.getSensor(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/', AuthenticationdMiddleware, (req, res) => {
            return sensorController.saveSensor(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/', AuthenticationdMiddleware, (req, res) => {
            return sensorController.saveSensor(req, res)
        })

        router.delete('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.deleteSensor(req, res)
        })

        router.put('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.updateSensor(req, res)
        })

        router.delete('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return sensorController.deleteSensor(req, res)
        })
    }
}
