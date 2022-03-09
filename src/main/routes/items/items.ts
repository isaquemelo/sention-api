import { Router } from 'express'
import { makeItemController } from '../../factories/makeItemController'
import ItemController from '../../../controllers/ItemController'

export default class ItemsRoutes {
    public static buildRoutes(router: Router) {
        const itemsController: ItemController = makeItemController()

        router.post('/items', async (req, res) => {
            //   console.log('POST items')
            itemsController.store(req, res)
        })

        router.get('/items', (req, res) => {
            console.log('GET items')
            itemsController.index(req, res)
        })
    }
}
