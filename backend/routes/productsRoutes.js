import { Router } from 'express'
import productController from '../app/controllers/productController.js';

const router = new Router();

//GET
router.get('/get-products', productController.getProducts);
router.get('/get-product/:id', productController.getProduct);

//POST
router.post('/add-product', productController.addProduct);

//PUT
router.put('/update-product/:id', productController.updateProduct);
router.patch('/update-product/:id', productController.updateProduct);

//DELETE
router.delete('/delete-product/:id', productController.deleteProduct);

export default router;