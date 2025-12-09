import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authorizeRole } from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.post("/", cartController.createCart);
cartRouter.get("/", cartController.getCarts);
cartRouter.get("/:cid", cartController.getCartById);
cartRouter.post("/:cid/product/:pid", authorizeRole("user"), cartController.addProductToCart);
cartRouter.put("/:cid", authorizeRole("user"), cartController.updateProductsInCart);
cartRouter.put("/:cid/product/:pid", authorizeRole("user"), cartController.updateProductQuantityInCart);
cartRouter.delete("/:cid/product/:pid", authorizeRole("user"), cartController.deleteProductInCartById);
cartRouter.delete("/:cid", authorizeRole("user"), cartController.deleteProductsInCart);
cartRouter.post("/:cid/purchase", authorizeRole("user"), cartController.purchaseCart);

export default cartRouter;