import express from 'express';
import { loginUserController, logoutHandler, refreshAccessTokenController, registerUserController } from '../controllers/auth';
import { validateLoginUserPayload, validateRegisterUserPayload } from '../validator';
import { ignoreUnProtectedRoutes, requiresAuthenticated } from '../middlewares/auth-middleware';

const router = express.Router();

router.route('/register').post(ignoreUnProtectedRoutes, validateRegisterUserPayload, registerUserController);
router.route('/login').post(ignoreUnProtectedRoutes, validateLoginUserPayload, loginUserController);

router.route('/refreshToken').post(refreshAccessTokenController)
router.route('/logout').post(requiresAuthenticated, logoutHandler);

export { router as authRouter };

