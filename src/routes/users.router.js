import { Router } from "express";
import * as UsersController from "../controllers/users.controller.js";
import { registerAuth, loginAuth, jwtAuth, authenticateRole, authorizeRole } from "../middlewares/auth.js";

const router = Router();

// Auth flows
router.post("/register", registerAuth, UsersController.register);
router.post("/login", loginAuth, UsersController.login);
router.get("/current", jwtAuth, UsersController.current);
router.get("/logout", UsersController.logout);

router.post("/forgot", UsersController.sendRecoveryMail);
router.post("/reset", UsersController.resetPassword);

// Solo admins
router.post("/update", authenticateRole, authorizeRole("admin"), UsersController.updatePassword);

router.get("/", authenticateRole, authorizeRole("admin"), UsersController.getUsers);
router.get("/:uid", authenticateRole, authorizeRole("admin"), UsersController.getUserById);
router.put("/:uid", authenticateRole, authorizeRole("admin"), UsersController.updateUser);
router.delete("/:uid", authenticateRole, authorizeRole("admin"), UsersController.deleteUser);

export default router;