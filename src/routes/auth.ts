import express from 'express';
import { loginUser, refreshAccessToken, registerUser } from '../controllers/auth';
import { ignoreUnProtectedRoutes } from '../middlewares/auth-middleware';
import { validateLoginUserPayload, validateRegisterUserPayload } from '../validator';

const router = express.Router();

router.route('/register').post(ignoreUnProtectedRoutes, validateRegisterUserPayload, registerUser);
router.route('/login').post(ignoreUnProtectedRoutes, validateLoginUserPayload, loginUser);

router.route('/refresh-token').post(refreshAccessToken);

export { router as authRouter };

