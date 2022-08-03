import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
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

        // 3. If the user exists, return back an error.
        if (existingUser) {
            throw new BadRequestError('Email address is in use.');
        }

        // 4. If the user does not exist, create the user.
        const user = User.build({ email, password });
        await user.save();

        // 5. Generate JSON Web Token (JWT).
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
            },
            process.env.JWT_KEY!
        );

        // 6. Store JWT on the session object.
        req.session = {
            jwt: userJwt
        };

        // 7. Send back notification.
        res.status(201).send(user);
    }
);

export { router as signupRouter };