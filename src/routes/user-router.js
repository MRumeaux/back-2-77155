import { Router } from "express";
import userModel from "../models/user-model.js";

const router = Router();


// GET ALL
router.get("/", async(req, res) =>{
    const users = await userModel.find();
    res.status(200).send({ message: "Todos los usuarios" });
})
// GET BY ID
router.get("/:id", async(req, res) =>{
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).send({ message: "Un usuario" });
})
// POST
router.post("/", async(res, req) =>{
    const {first_name, last_name, email} = req.body;
    const newUser = await userModel.create({first_name, last_name, email})
    res.status(201).send({ message: "Hola Coders", payload: newUser });
})
// PUT
router.put("/:id", async(res, req) =>{
    res.status(201).send({ message: "Hola Coders" });
})
// DELETE
router.delete("/:id", async(res, req) =>{
    res.status(200).send({ message: "Hola Coders" });
})


export default router;