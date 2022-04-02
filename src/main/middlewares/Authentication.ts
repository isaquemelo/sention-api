import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import { errors } from "../../constants/errorMessages";

export const AuthenticationdMiddleware = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(StatusCodes.UNAUTHORIZED).send({
        error: errors.AUTH_TOKEN_NOT_PRESENT
    })

    const parts = authHeader.split(" ")
    if (!(parts.length === 2)) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            error: errors.TOKEN_ERROR
        })
    }

    const [scheme, token] = parts


    if (!/^Bearer$/i.test(scheme)) res.status(StatusCodes.UNAUTHORIZED).send({
        error: errors.BAD_FORMATED_TOKEN
    })

    jwt.verify(token, <string>process.env.JWT_SECRET, (err, decoded: any) => {
        if (err) return res.status(StatusCodes.UNAUTHORIZED).send({
            error: errors.INVALID_TOKEN
        })

        if (decoded) {
            req.params.userId = decoded.id
        }

        return next()
    })
}
