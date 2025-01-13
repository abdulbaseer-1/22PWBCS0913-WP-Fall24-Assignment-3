import express from 'express';
import userController from '../controllers/UserController.js';
import { generateJWT } from "../middleware/JWT.js";



const router = express.Router();

router.post("/",userController.createUser);

router.post('/signin', userController.loginUser);

router.post('/signout', userController.logoutUser);

router.delete("/deleteAccout", userController.deleteUser);

export default router;
