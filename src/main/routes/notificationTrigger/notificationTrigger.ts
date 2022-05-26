import { Router } from 'express'

import { makeNotificationTriggerController } from '../../factories/makeNotificationTriggerController'
import NotificationTriggerController from '../../../controllers/NotificationTriggerController'

import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class NotificationTriggerRoutes {
    public static buildRoutes(router: Router) {
        const notificationTriggerController: NotificationTriggerController = makeNotificationTriggerController()

        router.post('/user/devices/sensors/:sensorId/notificationTrigger', AuthenticationdMiddleware, (req, res) => {
            return notificationTriggerController.saveNotificationTrigger(req, res)
        })

        router.delete('/user/devices/sensors/notificationTrigger/:notificationTriggerId', AuthenticationdMiddleware, (req, res) => {
            return notificationTriggerController.deleteNotificationTrigger(req, res)
        })

        router.put('/user/devices/sensors/notificationTrigger/:notificationTriggerId', AuthenticationdMiddleware, (req, res) => {
            return notificationTriggerController.updateNotificationTrigger(req, res)
        })
    }
}
