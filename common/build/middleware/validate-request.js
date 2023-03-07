"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../errors/request-validation-error");
const validateRequest = (req, res, next) => {
    // Capture validation errors.
    const errors = (0, express_validator_1.validationResult)(req);
    // Check for validation errors.
    if (!errors.isEmpty()) {
        // Throw error message using error-handler middleware.
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    next();
};
exports.validateRequest = validateRequest;
