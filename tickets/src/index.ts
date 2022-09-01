import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    // Throw an error if the Secret key is not properly defined.
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.')
    }

    // Connect to the database or throw an error if unable to.
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined.')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb.');
    } catch (error) {
        console.error(error);
    }

    // Start the application and define the port.
    app.listen(3000, () => {
        console.log('Listening on port 3000.');
    });
};

start();