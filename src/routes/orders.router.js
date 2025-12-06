import { Router } from "express";
import * as orderController from "../controllers/orders.controller.js";

const router = Router();

router.get("/", orderController.getOrders);
router.get("/:oid", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:oid", orderController.resolveOrder);
router.delete("/:oid", orderController.deleteOrder);

export default router;