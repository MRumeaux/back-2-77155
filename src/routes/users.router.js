import { Router } from "express";
import * as userController from "../controllers/users.controller.js";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/:uid", userController.getUserById);
router.put("/:uid", userController.updateUser);
router.delete("/:uid", userController.deleteUser);

export default router;