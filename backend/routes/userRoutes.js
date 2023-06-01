import { Router } from 'express'
import userController from '../app/controllers/userController.js';

const router = new Router();

//GET
router.get('/get-user/:id', userController.getUser);

//POST
router.post('/create-user', userController.createUser);

//DELETE
router.delete('/delete-user/:id', userController.deleteUser);

//PUT
router.put('/update-user/:id', userController.updateUser);

export default router;