import { Router } from "express";
import { upload } from "../middleware/cloudinary_multer.js";
import cartController from "../controllers/CartController.js";
 
const router = new Router();

router.get("/getCart", cartController.cartInfo);

router.put("/updateCart", cartController.updateCart);

router.put("/deleteItem", cartController.deleteCartItem);

export default router;