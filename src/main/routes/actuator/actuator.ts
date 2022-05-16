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

        router.delete('/user/devices/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return actuatorController.deleteActuator(req, res)
        })

        router.put('/user/devices/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return actuatorController.updateActuator(req, res)
        })

        router.get('/user/devices/actuators/:actuatorId', AuthenticationdMiddleware, (req, res) => {
            return actuatorController.getActuator(req, res)
        })
    }
}
