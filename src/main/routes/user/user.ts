import { Router } from 'express'
import UserController from '../../../controllers/UserController'
import { makeUserController } from '../../factories/makeUserController'
import { AllowOnlyOwnAccess } from '../../middlewares/AllowOnlyOwnAccess'
import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class UserRoutes {
    public static buildRoutes(router: Router) {
        const userController: UserController = makeUserController()

        router.post('/user', async (req, res) => {
            return userController.save(req, res)
        })

        // To-do require auth
        router.get('/user/:id', AuthenticationdMiddleware, AllowOnlyOwnAccess, (req, res) => {
            return userController.find(req, res)
        })
    }
}
