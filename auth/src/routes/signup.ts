import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

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

    // Query User Collection for existing email address.
    // 1. Retrieve email from the request body.
    const { email, password } = req.body;

    // 2. Search for an exsting user with the email address from the request body.
    const existingUser = await User.findOne({ email });

    // 3. If the user exists, return back an error.
    if (existingUser) {
        throw new BadRequestError('Email address is in use.');
    }

    // 4. Hash the password.

    // 5. If the user does not exist, create the user.
    const user = User.build({ email, password });
    await user.save();

    // 6. Generate JSON Web Token (JWT).
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 'asdf');

    // 7. Store JWT on the session object.
    req.session = {
        jwt: userJwt
    };

    // 8. Send back notification.
    res.status(201).send(user);
});

export { router as signupRouter };