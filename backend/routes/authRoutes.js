import { Router } from "express";
import authController from '../app/controllers/authController.js';

const router = new Router();

//POST
//Con los usuarios de la base de datos 'ayudate' (db local)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

//Con los usuarios de dummyJSON
router.post('/login-dummy', authController.loginDummyJSON);


export default router;