import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { APIError } from "../lib/api-error";
import { getMinimalUserById } from "../lib/auth";
import { APIResponse } from "../lib/api-response";

export const requiresAuthenticated: RequestHandler = async (req, res, next) => {
    const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) throw new APIError(401, "Unauthorized request. Please login to use this feature");

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

        const user = await getMinimalUserById((decodedToken as any)?.id);
        if (!user) throw new APIError(401, "Invalid access token.");

        (req as any).user = user;
        next();
    } catch (error) {
        throw new APIError(401, "Invalid access token.");
    }
}

export const ignoreUnProtectedRoutes: RequestHandler = async (req, res, next) => {
    const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        const user = await getMinimalUserById((decodedToken as any)?.id);
        (req as any).user = user;
        return res.status(200).json(new APIResponse('User session already active', 409, user));
    } catch (error) {
        next()
    }
}