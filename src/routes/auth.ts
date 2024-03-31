import express from 'express';
import { loginUserController, refreshAccessTokenController, registerUserController } from '../controllers/auth';
import { validateLoginUserPayload, validateRegisterUserPayload } from '../validator';
import { ignoreUnProtectedRoutes } from '../middlewares/auth-middleware';

const router = express.Router();

router.route('/register').post(ignoreUnProtectedRoutes, validateRegisterUserPayload, registerUserController);
router.route('/login').post(ignoreUnProtectedRoutes, validateLoginUserPayload, loginUserController);

router.route('/refreshToken').post(refreshAccessTokenController)

export { router as authRouter };

