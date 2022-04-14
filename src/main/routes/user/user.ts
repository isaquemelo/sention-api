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

        router.post('/user/devices/:deviceId/sensors/:sensorId/notificationTrigger', AuthenticationdMiddleware, (req, res) => {
            return userController.saveNotificationTrigger(req, res)
        })

        router.delete('/user/devices/:deviceId/sensors/:sensorId/notificationTrigger/:notificationTriggerId', AuthenticationdMiddleware, (req, res) => {
            return userController.deleteNotificationTrigger(req, res)
        })

        router.put('/user/devices/:deviceId/sensors/:sensorId/notificationTrigger/:notificationTriggerId', AuthenticationdMiddleware, (req, res) => {
            return userController.updateNotificationTrigger(req, res)
        })

        router.post('/user/devices/:deviceId/actuators/:actuatorId/trigger', AuthenticationdMiddleware, (req, res) => {
            return userController.saveActuatorTrigger(req, res)
        })

        router.delete('/user/devices/:deviceId/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return userController.deleteActuatorTrigger(req, res)
        })

        router.put('/user/devices/:deviceId/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return userController.updateActuatorTrigger(req, res)
        })
    }
}
