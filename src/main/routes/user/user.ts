import { Router } from 'express'
import UserController from '../../../controllers/UserController'
import { makeUserController } from '../../factories/makeUserController'
import { AllowOnlyOwnAccess } from '../../middlewares/users/AllowOnlyOwnAccess'
import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class UserRoutes {
    public static buildRoutes(router: Router) {
        const userController: UserController = makeUserController()

        router.post('/user', async (req, res) => {
            return userController.save(req, res)
        })

        router.get('/user/:id', AuthenticationdMiddleware, AllowOnlyOwnAccess, (req, res) => {
            return userController.find(req, res)
        })

        router.get('/user/devices/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return userController.getDevice(req, res)
        })

        router.post('/user/devices', AuthenticationdMiddleware, (req, res) => {
            return userController.associateDevice(req, res)
        })

        router.delete('/user/devices/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return userController.dissociateDevice(req, res)
        })
    }
}
