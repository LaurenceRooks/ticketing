"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a;
    // Check to see if either the request session or JSON web token property is not set,
    // which means the users is not logged in.
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next();
    }
    // If the user is logged in, evaluate the JSWON web token property to make sure it is valid.
    try {
        const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        // If valid, return the payload of the current user.
        req.currentUser = payload;
    }
    catch (error) {
    }
    next();
};
exports.currentUser = currentUser;
