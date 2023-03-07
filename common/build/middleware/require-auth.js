"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const requireAuth = (req, res, next) => {
    // Check to see if the current user is logged in.
    // If not, throw an error.
    if (!req.currentUser) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    // If logged in, move to the next function.
    next();
};
exports.requireAuth = requireAuth;
