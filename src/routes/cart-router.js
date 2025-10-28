import { Router } from "express";
import * as cartController from "../controller/cart-controller.js";

const cartRouter = Router();

cartRouter.post("/", cartController.createCart);
cartRouter.get("/", cartController.getCarts);
cartRouter.get("/:cid", cartController.getCartById);
cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);
cartRouter.put("/:cid", cartController.updateProductsInCart);
cartRouter.put("/:cid/product/:pid", cartController.updateProductQuantityInCart);
cartRouter.delete("/:cid/product/:pid", cartController.deleteProductInCartById);
cartRouter.delete("/:cid", cartController.deleteProductsInCart);

export default cartRouter;