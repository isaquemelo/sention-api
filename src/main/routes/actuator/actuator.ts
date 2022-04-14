import { Router } from 'express'

import ActuatorController from '../../../controllers/ActuatorController'

import { makeActuatorController } from '../../factories/makeActuatorController'
import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class ActuatorRoutes {
    public static buildRoutes(router: Router) {
        const actuatorController: ActuatorController = makeActuatorController()

        router.post('/user/devices/:deviceId/actuators', AuthenticationdMiddleware, (req, res) => {
            return actuatorController.saveActuator(req, res)
        })

        router.delete('/user/devices/:deviceId/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return actuatorController.deleteActuator(req, res)
        })

        router.put('/user/devices/:deviceId/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return actuatorController.updateActuator(req, res)
        })
    }
}
