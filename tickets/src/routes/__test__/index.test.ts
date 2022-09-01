import request from 'supertest';
import { app } from '../../app';

// Create helper function that creates tickets for the test case.
const createTicket = () => {
    // Define the title and price to validate at the end of the test.
    const title = 'Ticket Title';
    const price = 10;

    return request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: title,
            price: price
        });
};

it('Can fetch a list of the tickets.', async () => {
    // Execute helper function three times.
    await createTicket();
    await createTicket();
    await createTicket();

    // Retrieve the tickets.
    const response = await request(app)
        // Define the type of request and path with the ticket ID.
        .get('/api/tickets/')
        // Define the body of the request.
        .send()
        // Define the expected return code.
        .expect(200);

    // Make sure we have all three tickets.
    expect(response.body.length).toEqual(3);
});