import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Create an interface to define what the payload will be.
interface UserPayload {
    id: string;
    email: string;
}

// Augment the Request type definition to use the UserPayload interface
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        // Check to see if either the request session or JSON web token property is not set,
    // which means the users is not logged in.
    if (!req.session?.jwt) {
        return next();
    }

    // If the user is logged in, evaluate the JSWON web token property to make sure it is valid.
    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
            ) as UserPayload;
        // If valid, return the payload of the current user.
        req.currentUser = payload;
    } catch (error) {
    }

    next();
};