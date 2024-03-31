import z from "zod";

export const RegisterUserPayloadSchema = z.strictObject({
    name: z.string()
        .min(3, {
            message: 'Name must be at least 3 characters long'
        }),
    email: z.string()
        .email({
            message: 'Invalid email address'
        }),
    password: z.string()
        .min(6, {
            message: 'Password must be at least 6 characters long'
        }),
});

export const LoginUserSchema = z.strictObject({
    email: z.string()
        .email({
            message: 'Invalid email address'
        }),
    password: z.string()
        .min(6, {
            message: 'Password must be at least 6 characters long'
        }),
})

export type LoginUserPayload = z.infer<typeof LoginUserSchema>