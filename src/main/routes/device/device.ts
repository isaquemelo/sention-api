import { Router } from 'express'
import DeviceController from '../../../controllers/DeviceController'
import { makeDeviceController } from '../../factories/makeDeviceController'
import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class DeviceRoutes {
    public static buildRoutes(router: Router) {
        const deviceController: DeviceController = makeDeviceController()

        router.post('/devices', (req, res) => {
            return deviceController.createDevice(req, res)
        })

        router.post('/user/devices/associate', AuthenticationdMiddleware, (req, res) => {
            return deviceController.associateDevice(req, res)
        })

        router.delete('/user/devices/dissociate/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return deviceController.dissociateDevice(req, res)
        })

        router.get('/user/devices/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return deviceController.getDevice(req, res)
        })

        router.put('/user/devices/:deviceId', AuthenticationdMiddleware, (req, res) => {
            return deviceController.updateDevice(req, res)
        })
    }
}
