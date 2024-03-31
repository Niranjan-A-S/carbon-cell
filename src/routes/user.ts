import express from "express";
import { requiresAuthenticated } from "../middlewares/auth-middleware";
import { changePassword, getCurrentUser } from "../controllers/user";
import { validateChangePasswordPayload } from "../validator";

const router = express.Router();

router.route('/current').get(requiresAuthenticated, getCurrentUser);
router.route('/change-password').get(requiresAuthenticated, validateChangePasswordPayload, changePassword);

export { router as userRouter }