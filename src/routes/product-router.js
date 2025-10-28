import { Router } from "express";
import * as productController  from "../controller/product-controller.js";

const productRouter = Router();

productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', productController.getProductById)
productRouter.post('/', productController.addProduct)
productRouter.put('/:pid', productController.updateProduct)
productRouter.delete('/:pid', productController.deleteProduct)

export default productRouter;
