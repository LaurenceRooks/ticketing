import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@lartickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', requireAuth,
    [
        body('title')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Title is required.'),
        body('price')
            .trim()
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than zero.')
    ],
    // Use validate-request middleware to
    // 1) Capture validation errors,
    // 2) check for existing errors, and
    // 3) throw error message using error-handler middleware.
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        })

        await ticket.save();

        res.status(201).send(ticket);
});

export { router as createTicketRouter };