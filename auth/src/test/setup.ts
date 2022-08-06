import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

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