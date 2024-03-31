import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { APIError } from "../lib/api-error";
import { getMinimalUserInfoById } from "../lib/db";
import { APIResponse } from "../lib/api-response";

export const requiresAuthenticated: RequestHandler = async (req, _res, next) => {
    try {
    const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) throw new APIError(401, "Unauthorized request. Please login to use this feature");

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

        const user = await getMinimalUserInfoById((decodedToken as any)?.id);
        if (!user) throw new APIError(401, "Invalid access token.");

        (req as any).user = user;
        next();
    } catch (error) {
        next(error)
    }
}

export const ignoreUnProtectedRoutes: RequestHandler = async (req, res, next) => {
    const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        const user = await getMinimalUserInfoById((decodedToken as any)?.id);
        (req as any).user = user;
        return res.status(200).json(new APIResponse('User session already active', 409));
    } catch (error) {
        next()
    }
}