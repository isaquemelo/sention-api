import { Router } from 'express'
import AuthenticationController from '../../../controllers/AuthenticationController'
import { makeAuthenticationController } from '../../factories/makeAuthenticateController'

export default class AuthRoutes {
    public static buildRoutes(router: Router) {
        const authenticationController: AuthenticationController = makeAuthenticationController()

        router.post('/auth/user', async (req, res) => {
            return authenticationController.authenticate(req, res)
        })
    }
}
