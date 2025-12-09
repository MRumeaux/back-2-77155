import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/config.js";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hash) => bcrypt.compareSync(password, hash);

const JWT_SECRETO = JWT_SECRET;

export const generateToken = (user) => jwt.sign({user}, JWT_SECRETO, {expiresIn:"1h"});

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRETO);
    } catch (error) {
        return null;
    }
} 