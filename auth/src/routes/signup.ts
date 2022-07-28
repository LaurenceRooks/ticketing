import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup',
[
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters.')
],
async (req: Request, res: Response) => {
    // Capture validation errors.
    const errors = validationResult(req);

    // Check for validation errors.
    if (!errors.isEmpty()) {
        // Throw error message using error-handler middleware.
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log('Creating a user.');
    throw new DatabaseConnectionError();

    res.send({});
});

export { router as signupRouter };