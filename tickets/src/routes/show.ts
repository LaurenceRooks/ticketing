import express, { Request, Response } from 'express';
import { NotFoundError } from '@lartickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id',
    async (req: Request, res: Response) => {
        // Find the ticket using the ticket ID provided.
        const ticket = await Ticket.findById(req.params.id)

        // Throw an error if no ticket is found.
        if (!ticket) {
            throw new NotFoundError();
        }

        // Return the ticket if found.
        res.send(ticket);
});

export { router as showTicketRouter };