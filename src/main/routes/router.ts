import { Router } from 'express'
import AuthRoutes from './auth/auth'
import DeviceRoutes from './device/device'
import ItemsRoutes from './items/items'
import SensorRoutes from './sensor/sensor'
import UserRoutes from './user/user'

const router = Router()

let count = 0

router.get('/ping', (req, res) => {
    count++
    return res.status(200).send(`Pong ${count}`)
})

DeviceRoutes.buildRoutes(router)
ItemsRoutes.buildRoutes(router)
UserRoutes.buildRoutes(router)
SensorRoutes.buildRoutes(router)
AuthRoutes.buildRoutes(router)

export default router
