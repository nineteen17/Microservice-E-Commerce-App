import express from 'express';
import { getProductsByIds } from '../controllers/productController';

const router = express.Router();

router.get('/products/ids', getProductsByIds);

export default router;
