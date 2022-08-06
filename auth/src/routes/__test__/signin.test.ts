import request from 'supertest';
import { app } from '../../app';

it('Returns a 200 on successful signin.',async () => {
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
        .post('/api/users/signin')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        // Define the expected return code.
        .expect(200);
});

it('Returns a 400 with an invalid email.',async () => {
    return request(app)
        // Define the type of request and path.
        .post('/api/users/signin')
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
        .post('/api/users/signin')
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
        .post('/api/users/signin')
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
        .post('/api/users/signin')
        // Define the body of the request.
        .send({
            password: 'password'
        })
        // Define the expected return code.
        .expect(400);
});

it('Fails when an email that does not exist is supplied.',async () => {
    await request(app)
        // Define the type of request and path.
        .post('/api/users/signin')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        // Define the expected return code.
        .expect(400);
});

it('Fails when an incorrect password is supplied.',async () => {
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
        .post('/api/users/signin')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'wrongpassword'
        })
        // Define the expected return code.
        .expect(400);
});

it('Sets a cookie after successful signin.',async () => {
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
        .post('/api/users/signin')
        // Define the body of the request.
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        // Define the expected return code.
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});