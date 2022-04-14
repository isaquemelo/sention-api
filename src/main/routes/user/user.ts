import { Router } from 'express'

import { makeUserController } from '../../factories/makeUserController'
import UserController from '../../../controllers/UserController'

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
    }
}
