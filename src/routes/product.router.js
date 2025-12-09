import { Router } from "express";
import { authorizeRole } from "../middlewares/auth.js";
import * as productController  from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', productController.getProductById)
productRouter.post('/', authorizeRole("admin"), productController.addProduct)
productRouter.put('/:pid', authorizeRole("admin"), productController.updateProduct)
productRouter.delete('/:pid', authorizeRole("admin"), productController.deleteProduct)

export default productRouter;
