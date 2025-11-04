import { Router } from "express";
import userModel from "../models/user-model.js";
import { authenticateRole, authorizeRole } from "../middlewares/auth.js";

const router = Router();


// GET ALL
router.get("/", authenticateRole, authorizeRole("admin"), async (req, res) => {
    const users = await userModel.find();
    res.status(200).send({ users: users });
})
// GET BY ID
router.get("/:id", async(req, res) =>{
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).send({ user: user });
})
// POST
router.post("/", async(req, res) =>{
    res.status(201).send({ message: "Realizar registro en /register" });
})
// PUT
router.put("/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {new: true})
        if (!updatedUser) return res.status(404).json({ message: "Usuario no fue actualizado" });
        res.status(201).send({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        res.status(500).json({message: "Error actualizando usuario", err: error.message})
    }

})
// DELETE
router.delete("/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "Usuario no fue eliminado" });
        res.status(200).send({ message: "Usuario eliminado", user: deletedUser });
    } catch (error) {
        res.status(500).json({message: "Error eliminando usuario", err: error.message})
    }

})


export default router;