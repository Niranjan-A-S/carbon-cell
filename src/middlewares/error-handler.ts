import { ErrorRequestHandler } from "express";
import { APIError } from "../lib/api-error";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let error = err;

    if (!(err instanceof APIError)) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Something went wrong!';
        error = new APIError(statusCode, message, err?.errors || [], err?.stack);
    }
    const response = {
        ...error,
        message: error?.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    }

    return res.status(error.statusCode).json(response);
}