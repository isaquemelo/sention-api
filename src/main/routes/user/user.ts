import { Router } from 'express'
import UserController from '../../../controllers/UserController'
import { makeUserController } from '../../factories/makeUserController'
import { AllowOnlyOwnAccess } from '../../middlewares/users/AllowOnlyOwnAccess'
import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class UserRoutes {
    public static buildRoutes(router: Router) {
        const userController: UserController = makeUserController()

        router.post('/user', async (req, res) => {
            return userController.saveUser(req, res)
        })

        router.get('/user/:id', AuthenticationdMiddleware, AllowOnlyOwnAccess, (req, res) => {
            return userController.getUser(req, res)
        })

        router.get('/user/devices/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return userController.getDevice(req, res)
        })

        router.post('/user/devices/associate', AuthenticationdMiddleware, (req, res) => {
            return userController.associateDevice(req, res)
        })

        router.delete('/user/devices/dissociate/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return userController.dissociateDevice(req, res)
        })

        router.get('/user/devices/:deviceId/sensors/:sensorId/data', AuthenticationdMiddleware, (req, res) => {
            return userController.getSensorData(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/:sensorId/data', AuthenticationdMiddleware, (req, res) => {
            return userController.saveSensorData(req, res)
        })

        router.get('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return userController.getSensor(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/', AuthenticationdMiddleware, (req, res) => {
            return userController.saveSensor(req, res)
        })

        router.delete('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return userController.deleteSensor(req, res)
        })

        router.post('/user/devices/:deviceId/sensors/', AuthenticationdMiddleware, (req, res) => {
            return userController.saveSensor(req, res)
        })

        router.delete('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return userController.deleteSensor(req, res)
        })

        router.post('/user/devices/:deviceId/actuators', AuthenticationdMiddleware, (req, res) => {
            return userController.saveActuator(req, res)
        })

        router.delete('/user/devices/:deviceId/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return userController.deleteActuator(req, res)
        })

        router.put('/user/devices/:deviceId/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return userController.updateActuator(req, res)
        })

        router.post('/user/devices/:deviceId/actuators/:actuatorId/trigger', AuthenticationdMiddleware, (req, res) => {
            return userController.saveActuatorTrigger(req, res)
        })

        router.delete('/user/devices/:deviceId/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return userController.deleteActuatorTrigger(req, res)
        })
    }
}
