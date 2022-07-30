import mongoose from "mongoose";
import { Password } from '../services/password';

// An interface that describes the properties required to create a new User.
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that a User Model has.
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has.
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

// Define the model and data elements.
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

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Function used to create a new User wth typescript instead of using new function.
// Required only for Mongoose.
// Statics adds the function to the userSchema model.
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

// Define the user based on the table.
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Make the user available for use.
export { User };