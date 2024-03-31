import { RequestHandler } from "express";
import { LoginUserSchema, RegisterUserPayloadSchema } from "../schema";
import { APIError } from "../lib/api-error";

export const validateRegisterUserPayload: RequestHandler = (req, res, next) => {
    const result = RegisterUserPayloadSchema.safeParse(req.body);
    if (result.success) return next();

    const errors = result.error.errors.map(error => ({
        message: error.message,
        item: error.path.toString() //TODO: revisit this
    }));

    throw new APIError(422, 'Invalid user information', errors);
}


export const validateLoginUserPayload: RequestHandler = (req, res, next) => {
    const result = LoginUserSchema.safeParse(req.body);
    if (result.success) return next();

    const errors = result.error.errors.map(error => ({
        message: error.message,
        item: error.path.toString() //TODO: revisit this
    }));

    throw new APIError(422, 'Invalid login information', errors);
}