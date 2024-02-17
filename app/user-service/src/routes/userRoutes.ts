import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import * as userController from '../controllers/userController'
const router = express.Router();

router.route('/profile').get(authMiddleware, userController.getUserProfile).put(userController.updateUserProfile);
router.route('/watchlist/:productId').post(authMiddleware, userController.addWatchlistProduct).delete(authMiddleware, userController.deleteWatchlistProduct);

export default router;