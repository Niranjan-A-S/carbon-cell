import { LoginUserSchema, RegisterUserPayloadSchema } from "../schema";
import z from "zod";

export type RegisterUserPayload = z.infer<typeof RegisterUserPayloadSchema>;

export type LoginUserPayload = z.infer<typeof LoginUserSchema>
