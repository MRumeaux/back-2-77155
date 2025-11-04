import { Router } from "express";
import userModel from "../models/user-model.js";
import { createHash, generateToken, isValidPassword } from "../utils/index.js";
import passport from "passport";


const router = Router();

// rutas post

//registro de usuario
router.post(
"/register", 
passport.authenticate("register", { failureRedirect: "failregister" }), 
async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const hashed_pass = createHash(password);
    res.status(201).redirect("/login");
});

router.get("/failregister", (req, res) => {
    res
    .status(400)
    .send({ status: "error", message: "Error al registrar el usuario." });
});
    
//recupero de pass
router.post("/recupero", async(req, res)=> {
    const {email, password} = req.body;
    
    try {
        if (!email || !password){
            return res.status(401).send({message: "Ingrese los campos requeridos para completar la solicitud de recupero de cuenta."});
        }
        const userFound = await userModel.findOne({email: email});
        if (!userFound){
            return res.status(401).send({message: "No se encuentra el correo solicitado."});
        }
        const hashed_pass = createHash(password);
        userFound.password = hashed_pass;
        await userFound.save();
        res.redirect("/login")
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error interno del servidor.", err: error.message });
    }
    
    
})

// logout
router.post("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) return res.status(500).send("Error al cerrar sesión.");
            res.redirect("/");
        })
    }
})


// NUEVO

router.post("/login", async(req, res) =>{
    const { email, password } = req.body;
    
    try {        
        const userExist = await userModel.findOne({email: email});
        if (userExist){
            const ValidPassword = isValidPassword(password, userExist.password);
            if(ValidPassword) {
                const userPayload = {
                    id: userExist._id,
                    first_name: userExist.first_name,
                    last_name: userExist.last_name,
                    age: userExist.age,
                    email: userExist.email
                }
                const token = generateToken(userPayload);
                res.cookie("authCookie", token, {maxAge: 3600000, httpOnly: true});
                res.redirect("/current");
            }
        } else {
            res.status(401).json({message: "Error de credenciales"})
        }

    } catch (error) {
        res
        .status(500)
        .json({ message: "Error interno del servidor.", err: error.message });
    }
    
})


export default router;