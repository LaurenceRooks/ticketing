import mongoose from "mongoose";

// Define the table and data elements.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define the user based on the table.
const User = mongoose.model('User', userSchema);

// Make the user available for use.
export { User };