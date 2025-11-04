import { Router } from "express";
import { verifyToken } from "../utils/index.js";
//import passport from "passport";
const router = Router();

router.get("/register", (req, res) => {
    res.render("register", { title: "REGISTER" });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "LOGIN" });
});

router.get("/profile", (req, res) => {
    const token = req.cookies.authCookie;
    console.log(`Token desde la cookie:${token}`);

    const user  = verifyToken(token);

    res.render("current", { title: "CURRENT", user: user });
});


router.get("/recupero", (req, res) => {
    res.render("recupero", { title: "Recuperar password" });
});

export default router;