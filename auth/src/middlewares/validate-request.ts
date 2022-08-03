import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Capture validation errors.
    const errors = validationResult(req);

    // Check for validation errors.
    if (!errors.isEmpty()) {
        // Throw error message using error-handler middleware.
        throw new RequestValidationError(errors.array());
    }

    next();
};