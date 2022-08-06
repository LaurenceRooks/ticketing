import request from 'supertest';
import { app } from '../../app';

it('Clears the cookie after successful signout.',async () => {
    await request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        // Define the expected return code.
        .expect(201);
    
    const response = await request(app)
        // Define the type of request and path.
        .post('/api/users/signout')
        // Define the body of the request.
        .send({})
        // Define the expected return code.
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});