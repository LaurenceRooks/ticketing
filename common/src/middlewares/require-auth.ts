import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check to see if the current user is logged in.
    // If not, throw an error.
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    // If logged in, move to the next function.
    next();
}