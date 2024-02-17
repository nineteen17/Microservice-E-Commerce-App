import express from 'express';
import { publishMessage } from '../rabbitmq/publish'; 
import { errorMessage } from '../utils/errorMessage'
import authMiddleware from '../middlewares/authMiddleware';
import * as userController from '../controllers/userController'
const router = express.Router();

router.route('/profile').get(authMiddleware, userController.getUserProfile).put(userController.updateUserProfile);
router.route('/watchlist/:productId').post(authMiddleware, userController.addWatchlistProduct).delete(authMiddleware, userController.deletWatchlistProduct);

export default router;