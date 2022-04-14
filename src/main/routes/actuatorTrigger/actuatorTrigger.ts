import { Router } from 'express'

import { makeActuatorTriggerController } from '../../factories/makeActuatorTriggerController'

import ActuatorTriggerController from '../../../controllers/ActuatorTriggerController'

import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class ActuatorTrigger {
    public static buildRoutes(router: Router) {
        const actuatorTriggerController: ActuatorTriggerController = makeActuatorTriggerController()

        router.post('/user/devices/:deviceId/actuators/:actuatorId/trigger', AuthenticationdMiddleware, (req, res) => {
            return actuatorTriggerController.saveActuatorTrigger(req, res)
        })

        router.delete('/user/devices/:deviceId/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return actuatorTriggerController.deleteActuatorTrigger(req, res)
        })

        router.put('/user/devices/:deviceId/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return actuatorTriggerController.updateActuatorTrigger(req, res)
        })
    }
}
