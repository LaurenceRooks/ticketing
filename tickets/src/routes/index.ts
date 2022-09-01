import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets',
    async (req: Request, res: Response) => {
        // Find the ticket using the ticket ID provided.
        const tickets = await Ticket.find({})

        // Return the ticket if found.
        res.send(tickets);
});

export { router as indexTicketRouter };