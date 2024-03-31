import express from 'express';
import { loginUser, logout, refreshAccessToken, registerUser } from '../controllers/auth';
import { validateLoginUserPayload, validateRegisterUserPayload } from '../validator';
import { ignoreUnProtectedRoutes, requiresAuthenticated } from '../middlewares/auth-middleware';

const router = express.Router();

router.route('/register').post(ignoreUnProtectedRoutes, validateRegisterUserPayload, registerUser);
router.route('/login').post(ignoreUnProtectedRoutes, validateLoginUserPayload, loginUser);

router.route('/refreshToken').post(refreshAccessToken)
router.route('/logout').post(requiresAuthenticated, logout);

export { router as authRouter };

