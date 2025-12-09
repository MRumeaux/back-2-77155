import passport from "passport";

export const registerAuth = passport.authenticate("register", { session: false, failureMessage: true });
export const loginAuth = passport.authenticate("login", { session: true, failureMessage: true });
export const jwtAuth = passport.authenticate("jwt", { session: false, failureMessage: true });

export const authenticateRole = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    return res.status(401).json({ message: "No autenticado" });
};

export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: "No autorizado" });
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    }
}