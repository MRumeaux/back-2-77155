import passport from "passport";

export const authenticateRole = passport.authenticate("current", {session: false})

export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({message: "Acceso denegado"});
        }
        next();
    }
}