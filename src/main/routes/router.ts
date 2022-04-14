import { Router } from 'express'
import ActuatorRoutes from './actuator/actuator'
import AuthRoutes from './auth/auth'
import DeviceRoutes from './device/device'
import ItemsRoutes from './items/items'
import NotificationTriggerRoutes from './notificationTrigger/notificationTrigger'
import SensorRoutes from './sensor/sensor'
import UserRoutes from './user/user'

const router = Router()

let count = 0

router.get('/ping', (req, res) => {
    count++
    return res.status(200).send(`Pong ${count}`)
})

AuthRoutes.buildRoutes(router)
UserRoutes.buildRoutes(router)
DeviceRoutes.buildRoutes(router)
SensorRoutes.buildRoutes(router)
ActuatorRoutes.buildRoutes(router)
NotificationTriggerRoutes.buildRoutes(router)

ItemsRoutes.buildRoutes(router)

export default router
