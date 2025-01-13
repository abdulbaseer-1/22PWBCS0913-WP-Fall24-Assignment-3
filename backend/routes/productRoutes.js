import { Router } from "express";
import { upload } from "../middleware/cloudinary_multer.js";
import productController from "../controllers/ProductController.js";
 
const router = new Router();

router.post("/",upload, (req,res) => {
    console.log("inside", req.body);
    productController.createProduct(req,res)
});

router.get("/getProducts", productController.getProduct);

router.put("/updateProduct",upload, productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;