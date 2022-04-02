import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// import { errors } from "../../constants/errorMessages";

export const AllowOnlyOwnAccess = (req: Request, res: Response, next: any) => {
    // Get id from params
    // The userId is injected by the auth middleware
    const { id, userId } = req.params

    if (id !== userId) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next()
}
