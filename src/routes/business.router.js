import { Router } from "express";
import * as businessController from "../controllers/business.controller.js";

const router = Router();

router.get("/", businessController.getBusinesses);
router.get("/:bid", businessController.getBusinessById);
router.post("/", businessController.createBusiness);
router.post("/:bid/product", businessController.addProductToBusiness);
router.put("/:bid", businessController.editBusiness);
router.delete("/:bid", businessController.deleteBusiness);

export default router;