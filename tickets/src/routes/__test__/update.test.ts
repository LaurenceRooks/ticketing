import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Returns a 404 if the provided ID does not exist.', async () => {
    // Use Mongoose function to generate test ticket ID.
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        // Define the type of request and path.
        .put(`/api/tickets/${id}`)
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: 'Test Ticket',
            price: 20
        })
        // Define the expected return code.
        .expect(404);
});

it('Returns a 401 if the user is not authenticated.', async () => {
    // Use Mongoose function to generate test ticket ID.
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        // Define the type of request and path.
        .put(`/api/tickets/${id}`)
        // Define the body of the request.
        .send({
            title: 'Test Ticket',
            price: 20
        })
        // Define the expected return code.
        .expect(401);
});

it('Returns a 401 if the user does not own the ticket.', async () => {
    // Create the initial ticket.
    const response = await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: 'Test Ticket',
            price: 20
        });

    // Update the ticket.
    await request(app)
        // Define the type of request and path.
        .put(`/api/tickets/${response.body.id}`)
        // Define the cookie.
        .set('Cookie', global.signin())
        // Define the body of the request.
        .send({
            title: 'Tested Ticket',
            price: 40
        })
        // Define the expected return code.
        .expect(401);
});

it('Returns a 400 if the user provides an invalid title or price.', async () => {
    // Store the cookie for the validation test.
    const cookie = global.signin();

    // Create the initial ticket.
    const response = await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', cookie)
        // Define the body of the request.
        .send({
            title: 'Test Ticket',
            price: 20
        });

    // Update the ticket with invalid title.
    await request(app)
        // Define the type of request and path.
        .put(`/api/tickets/${response.body.id}`)
        // Define the cookie.
        .set('Cookie', cookie)
        // Define the body of the request.
        .send({
            title: '',
            price: 20
        })
        // Define the expected return code.
        .expect(400);

    // Update the ticket with invalid price.
    await request(app)
        // Define the type of request and path.
        .put(`/api/tickets/${response.body.id}`)
        // Define the cookie.
        .set('Cookie', cookie)
        // Define the body of the request.
        .send({
            title: 'Test Ticket',
            price: -10
        })
        // Define the expected return code.
        .expect(400);
});

it('Updates the ticket and provides valid inputs.', async () => {
    // Store the cookie for the validation test.
    const cookie = global.signin();

    // Create the initial ticket.
    const response = await request(app)
        // Define the type of request and path.
        .post('/api/tickets')
        // Define the cookie.
        .set('Cookie', cookie)
        // Define the body of the request.
        .send({
            title: 'Test Ticket',
            price: 20
        });

    // Update the ticket with a title and price.
    await request(app)
        // Define the type of request and path.
        .put(`/api/tickets/${response.body.id}`)
        // Define the cookie.
        .set('Cookie', cookie)
        // Define the body of the request.
        .send({
            title: 'New Title',
            price: 30
        })
        // Define the expected return code.
        .expect(200);
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('New Title');
    expect(ticketResponse.body.price).toEqual(30);
});