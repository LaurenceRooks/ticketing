import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// Declare Gloal signin
declare global {
    var signin: () => Promise<string[]>;
  }

// Define mongo.
let mongo: any;

// Hook Function to run before all of our tests.
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
    });
});

// Hook Function to run before each of our tests.
beforeEach(async () => {
    // Determine all collections.
    const collections = await mongoose.connection.db.collections();

    // Loop through all collections to delete the data from the database.
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// Hook Function to run after all our tests.
afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });

// Global SignUp Function for all of our tests.
global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        // Define the type of request and path.
        .post('/api/users/signup')
        // Define the body of the request.
        .send({
            email,
            password
        })
        // Define the expected return code.
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}