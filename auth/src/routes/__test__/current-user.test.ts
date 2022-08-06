import request from 'supertest';
import { app } from '../../app';

it('Responds with details about the current user.',async () => {
    const cookie = await signin();
    
    const response = await request(app)
        // Define the type of request and path.
        .get('/api/users/currentuser')
        // Provide the cookie from the signup request.
        .set('Cookie', cookie)
        // Define the body of the request.
        .send()
        // Define the expected return code.
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Responds with null if not authenticated.',async () => {
    const response = await request(app)
        // Define the type of request and path.
        .get('/api/users/currentuser')
        // Define the body of the request.
        .send()
        // Define the expected return code.
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});