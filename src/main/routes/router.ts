import { Router } from 'express'
import ItemsRoutes from './items/items'

const router = Router()

let count = 0

router.get('/ping', (req, res) => {
    console.log(JSON.stringify(req.headers));
    return res.status(200).send(`Pong ${count}`)
})


ItemsRoutes.buildRoutes(router)

export default router
