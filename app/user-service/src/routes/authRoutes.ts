import express from 'express';
import { validateMiddleware } from '../middlewares/validationMiddleware';
import { LoginSchema, RefreshTokenShema, RegisterSchema } from '../utils/validations';
import * as authController from '../controllers/authController'
import { rateLimitMiddleware } from '../middlewares/ratelimitMiddleware';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/register', validateMiddleware(RegisterSchema), authController.registerController);
router.post('/login', validateMiddleware(LoginSchema), rateLimitMiddleware, authController.loginController);
router.post('/logout', authController.logoutController);
router.post('/refresh-token', validateMiddleware(RefreshTokenShema), authController.refreshTokenController);
router.get('/get-auth', (req: Request, res: Response) => {
    res.status(200).send("authRoutes is working")
})

export default router;
