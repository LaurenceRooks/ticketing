import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// Declare Gloal signin
declare global {
    var signin: () => string[];
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
global.signin = () => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    // Create the JWT.
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build the sesssion object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn the session into JSON.
    const sessionJSON = JSON.stringify(session);

    // Take the JSON and encode it as base64.
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // Return a string that is the cookie with the encoded data.
    return [`session=${base64}`];
}