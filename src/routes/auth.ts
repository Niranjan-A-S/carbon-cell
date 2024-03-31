import express from 'express';
import { registerUserController } from '../controllers/auth';
import { validateRegisterUserPayload } from '../validator';

const router = express.Router();

router.route('/register').post(validateRegisterUserPayload, registerUserController);

export { router as authRouter };

