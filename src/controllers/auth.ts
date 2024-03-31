import { RequestHandler } from "express"
import { RegisterUserPayload } from "../schema";
import { db } from "../lib/db";
import { getHashedPassword, getUserByEmail } from "../lib/auth";
import { APIError } from "../lib/api-error";
import { APIResponse } from "../lib/api-response";

export const registerUserController: RequestHandler<any, any, RegisterUserPayload> = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) throw new APIError(409, 'User already exists');

        const hashedPassword = await getHashedPassword(password);

        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        return res.status(201).json(new APIResponse('User created successfully', 201));

    } catch (error) {
        next(error)
    }
}