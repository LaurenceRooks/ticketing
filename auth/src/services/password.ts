import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        // Separate out hashed password and salt from what is stored in the database.
        const [hashedPassword, salt] = storedPassword.split('.');

        // Hash the supplied password the same way.
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        // Return the comparison of both hashed passwords.
        return buf.toString('hex') === hashedPassword;
    }
}