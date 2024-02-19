import express from 'express';
import * as productController from '../controllers/productController'
const router = express.Router()

router.post('/', productController.createProduct);

router.get('/', productController.getProducts);

router.get('/search', productController.searchProduct);

router.get('/product/:id', productController.getProductById);

router.put('/product/:id', productController.updateProduct);

router.delete('/product/:id', productController.deleteProduct);

export default router;