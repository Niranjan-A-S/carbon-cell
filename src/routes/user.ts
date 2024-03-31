import express from "express";
import { requiresAuthenticated } from "../middlewares/auth-middleware";
import { changePassword, getCurrentUser } from "../controllers/user";
import { validateChangePasswordPayload } from "../validator";
import { logout } from "../controllers/user"

const router = express.Router();

router.route('/current').get(requiresAuthenticated, getCurrentUser);
router.route('/change-password').get(requiresAuthenticated, validateChangePasswordPayload, changePassword);
router.route('/logout').post(requiresAuthenticated, logout);

export { router as userRouter }