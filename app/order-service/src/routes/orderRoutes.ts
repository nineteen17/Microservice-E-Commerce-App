import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { OrderSchema } from '../schemas/orderSchema';
import { validateMiddleware } from "../middlewares/validationMiddleware";
import * as orderController from '../controllers/orderController'

const router = express.Router();

router.post('/', authMiddleware, validateMiddleware(OrderSchema), orderController.createOrder);
router.post('/stripe-hook/', authMiddleware, validateMiddleware(OrderSchema), orderController.updateOrder);
export default router;

