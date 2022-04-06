import { Router } from 'express'
import DeviceController from '../../../controllers/DeviceController'
import { makeDeviceController } from '../../factories/makeDeviceController'

export default class DeviceRoutes {
    public static buildRoutes(router: Router) {
        const deviceController: DeviceController = makeDeviceController()

        router.post('/devices', (req, res) => {
            return deviceController.createDevice(req, res)
        })
    }
}
