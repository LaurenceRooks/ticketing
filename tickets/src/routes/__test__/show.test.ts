import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Returns a 404 if the ticket is not found.', async () => {
    // Use Mongoose function to generate test ticket ID.
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        // Define the type of request and path.
        .get(`/api/tickets/${id}`)
        // Define the body of the request.
        .send()
        // Define the expected return code.
        .expect(404);
});

it('Returns the ticket if the ticket is found.', async () => {
    // Define the title and price to validate at the end of the test.
    const title = 'Ticket Title';
    const price = 10;

    const response = await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: title,
            price: price
        })
        // Define the expected return code.
        .expect(201);

    // Retrieve the ticket ID.
    const ticketResponse = await request(app)
        // Define the type of request and path with the ticket ID.
        .get(`/api/tickets/${response.body.id}`)
        // Define the body of the request.
        .send()
        // Define the expected return code.
        .expect(200);

    // Inspect the response to make sure it has the correct title and price.
    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});