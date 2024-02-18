import express from 'express';
import { validateMiddleware } from '../middlewares/validationMiddleware';
import { LoginSchema, RefreshTokenShema, RegisterSchema } from '../utils/validations';
import * as authController from '../controllers/authController'
import { rateLimitMiddleware } from '../middlewares/ratelimitMiddleware';

const router = express.Router();

router.post('/register', validateMiddleware(RegisterSchema), authController.registerController);
router.post('/login', validateMiddleware(LoginSchema), rateLimitMiddleware, authController.loginController);
router.post('/logout', authController.logoutController);
router.post('/refresh-token', validateMiddleware(RefreshTokenShema), authController.refreshTokenController);

export default router;
