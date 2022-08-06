import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 on successful signup.',async () => {
    return request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        // Define the expected return code.
        .expect(201);
});

it('Returns a 400 with an invalid email.',async () => {
    return request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email: 'test',
            password: 'password'
        })
        // Define the expected return code.
        .expect(400);
});

it('Returns a 400 with an invalid password.',async () => {
    return request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        // Define the expected return code.
        .expect(400);
});

it('Returns a 400 with missing password.',async () => {
    return request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email: 'test@test.com'
        })
        // Define the expected return code.
        .expect(400);
});

it('Returns a 400 with missing email.',async () => {
    return request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            password: 'password'
        })
        // Define the expected return code.
        .expect(400);
});

it('Disallows dulicate emails.',async () => {
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

        await request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        // Define the expected return code.
        .expect(400);
});