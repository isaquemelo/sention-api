import { Router } from 'express'
import ItemsRoutes from './items/items'
import UserRoutes from './user/user'

const router = Router()

let count = 0

router.get('/ping', (req, res) => {
    count++
    return res.status(200).send(`Pong ${count}`)
})


ItemsRoutes.buildRoutes(router)
UserRoutes.buildRoutes(router)

export default router
