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

        router.get('/user/devices/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return userController.getDevice(req, res)
        })

        router.post('/user/devices/associate', AuthenticationdMiddleware, (req, res) => {
            return userController.associateDevice(req, res)
        })

        router.delete('/user/devices/dissociate/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return userController.dissociateDevice(req, res)
        })

        router.get('/user/devices/:deviceId/sensors/:sensorId', AuthenticationdMiddleware, (req, res) => {
            return userController.getSensor(req, res)
        })
    }
}
