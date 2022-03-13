import PrismaUserRepository from '../../repositories/PrismaUserRepository'
import AuthenticationController from '../../controllers/AuthenticationController'
import AuthenticateUserUseCase from '../../useCases/authetication/AutheticateUserUseCase'


const makeAuthenticationController = (): AuthenticationController => {
    const prismaUserStorage = new PrismaUserRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUserStorage)

    return new AuthenticationController(authenticateUserUseCase)
}

export { makeAuthenticationController }
