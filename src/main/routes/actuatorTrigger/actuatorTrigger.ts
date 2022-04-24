import { Router } from 'express'

import { makeActuatorTriggerController } from '../../factories/makeActuatorTriggerController'

import ActuatorTriggerController from '../../../controllers/ActuatorTriggerController'

import { AuthenticationdMiddleware } from '../../middlewares/Authentication'

export default class ActuatorTriggerRoutes {
    public static buildRoutes(router: Router) {
        const actuatorTriggerController: ActuatorTriggerController = makeActuatorTriggerController()

        router.post('/user/devices/actuators/:actuatorId/trigger', AuthenticationdMiddleware, (req, res) => {
            return actuatorTriggerController.saveActuatorTrigger(req, res)
        })

        router.delete('/user/devices/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return actuatorTriggerController.deleteActuatorTrigger(req, res)
        })

        router.put('/user/devices/actuators/:actuatorId/trigger/:triggerId', AuthenticationdMiddleware, (req, res) => {
            return actuatorTriggerController.updateActuatorTrigger(req, res)
        })
    }
}


 
