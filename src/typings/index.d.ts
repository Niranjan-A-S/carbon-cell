import { getMinimalUserInfoById } from "../lib/db";

export type MinimalUserInfo = Awaited<ReturnType<typeof getMinimalUserInfoById>>

declare global {
    namespace Express {
        interface Request {
            user: MinimalUserInfo;
        }
    }
}