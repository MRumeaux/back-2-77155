import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hash) => bcrypt.compareSync(password, hash);

const JWT_SECRET = "secretito123"

export const generateToken = (user) => jwt.sign({user}, JWT_SECRET, {expiresIn:"1h"});

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
} 