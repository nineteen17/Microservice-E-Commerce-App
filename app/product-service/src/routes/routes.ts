import express from 'express';
import * as productController from '../controllers/productController'
const router = express.Router()

router.post('/', productController.createProduct);

// GET request to fetch all products and also to filter using quesr params
router.get('/', productController.getProducts);

// Get for searching /search?term=craft+ale
router.get('/search', productController.searchProduct);

// GET request to fetch a single product by id
router.get('/product/:id', productController.getProductById);

// PUT request to update a product by id
router.put('/product/:id', productController.updateProduct);

// DELETE request to delete a product by id
router.delete('/product/:id', productController.deleteProduct);

export default router;