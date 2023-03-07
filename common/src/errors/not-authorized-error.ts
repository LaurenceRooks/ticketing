import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not Authorized.');

        // This line of code is necessary because we are extending a built-in class.
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [
            { message: 'Not Authorized.' }
        ];
    }
}