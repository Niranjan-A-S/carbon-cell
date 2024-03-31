import { db } from "./db"
import bcrypt from "bcryptjs"

export const getUserByEmail = async (email: string) => {
    try {
        return await db.user.findUnique({ where: { email } })
    } catch (error) {
        return null
    }
}
export const generateAcessToken = () => {

}

export const getHashedPassword = async (password: string) => await bcrypt.hash(password, 10);