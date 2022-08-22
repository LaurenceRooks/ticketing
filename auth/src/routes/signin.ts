import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Password } from '../services/password';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@lartickets/common';

const router = express.Router();

router.post('/api/users/signin',
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
    // Use validate-request middleware to
    // 1) Capture validation errors,
    // 2) check for existing errors, and
    // 3) throw error message using error-handler middleware.
    validateRequest,
    async (req: Request, res: Response) => {
        // Query User Collection for existing email address.
        // 1. Retrieve email from the request body.
        const { email, password } = req.body;

        // 2. Search for an exsting user with the email address from the request body.
        const existingUser = await User.findOne({ email });

        // 3. If the user does not exist, return back an error.
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials.');
        }

        // 4. Verify the password matches what is stored.
        const passwordsMatch = await Password.compare(existingUser.password, password);

        // 5. If the password does not match, throw error.
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials.');
        }

        // 6. Generate JSON Web Token (JWT).
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
            },
            process.env.JWT_KEY!
        );

        // 7. Store JWT on the session object.
        req.session = {
            jwt: userJwt
        };

        // 8. Send back notification.
        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };