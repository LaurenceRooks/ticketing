import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('Has a route handler listening to /api/tickets for post requests.', async () => {
    const response = await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the body of the request.
        .send({});

    // Define the expected return code.
    expect(response.status).not.toEqual(404);
});

it('Can only be accessed if the user is signed in.', async () => {
    await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the body of the request.
        .send({})
        // Define the expected return code.
        .expect(401);
});

it('Returns a status other than 401 if the user is signed in.', async () => {
    const response = await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({});

    // Define the expected return code.
    expect(response.status).not.toEqual(401);
});

it('Returns an error if an invalid title is provided.', async () => {
    await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: '',
            price: 10
        })
        // Define the expected return code.
        .expect(400);
    
    await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            price: 10
        })
        // Define the expected return code.
        .expect(400);
});

it('Returns an error if an invalid price is provided.', async () => {
    await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: 'Ticket Title',
            price: -10
        })
        // Define the expected return code.
        .expect(400);
    
    await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: 'Ticket Title'
        })
        // Define the expected return code.
        .expect(400);
});

it('Creates a ticket with valid inputs.', async () => {
    // Define the title and price to validate at the end of the test.
    const title = 'Ticket Title';
    const price = 10;
    // Find all the tickets that exist in the Ticket collection.
    let tickets = await Ticket.find({});
    // Because we clear out everything within the in-memory database, there should not be any tickets.
    expect(tickets.length).toEqual(0);

    await request(app)
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

    // Find all the tickets that exist in the Ticket collection.
    tickets = await Ticket.find({});
    // There should now be one ticket after the test.
    expect(tickets.length).toEqual(1);
    // The ticket and price should match what was entered.
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
});