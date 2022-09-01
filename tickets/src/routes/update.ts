import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError } from '@lartickets/common';
import { Ticket } from '../models/ticket';
import { showTicketRouter } from './show';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth,
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
        // Find the ticket using the ticket ID provided.
        const ticket = await Ticket.findById(req.params.id)

        // Throw an error if no ticket is found.
        if (!ticket) {
            throw new NotFoundError();
        }

        // Throw an error if the user ID of the ticket owner does not match the user ID of the person updating the ticket.
        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        // If no error, apply the update(s).
        ticket.set({
            title: req.body.title,
            price: req.body.price
        });

        await ticket.save();

        res.send(ticket);
});

export { router as updateTicketRouter };