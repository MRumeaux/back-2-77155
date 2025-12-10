import * as userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/index.js";
import UserDTO from "../dto/UserDTO.js";
import crypto from "crypto";
import { transporter } from "../middlewares/nodemailer.js";
import envs from "../config/config.js";

export const register = async (req, res) => {
    try {
        const user = req.user; // deriva de passport "register"
        if (!user) return res.status(400).json({ status: "error", message: "Usuario no registrado" });
        return res.status(201).json({ status: "success", payload: new UserDTO(user) });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const user = req.user; // deriva de passport "login"
        if (!user) return res.status(401).json({ status: "error", message: "Error de credenciales" });
        return res.status(200).json({ status: "success", payload: new UserDTO(user) });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const current = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ status: "error", message: "No autorizado" });
        return res.status(200).json({ status: "success", payload: new UserDTO(req.user) });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        req.logout(err => {
            if (err) return res.status(500).json({ status: "error", message: err.message });
            if (req.session) req.session.destroy(() => {});
            res.clearCookie("connect.sid");
            return res.status(200).json({ status: "success", message: "Usuario deslogueado" });
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ status: "error", message: "No autorizado" });
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).json({ status: "error", message: "Se requieren currentPassword y newPassword" });

        if (!isValidPassword(currentPassword, user.password)) {
            return res.status(401).json({ status: "error", message: "Contraseña actual incorrecta" });
        }
        if (isValidPassword(newPassword, user.password)) {
            return res.status(400).json({ status: "error", message: "Nueva contraseña igual a la actual" });
        }

        const hashed = createHash(newPassword);
        const updated = await userRepository.updateUser(user._id, { password: hashed });
        return res.status(200).json({ status: "success", payload: new UserDTO(updated) });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const sendRecoveryMail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ status: "error", message: "Email requerido" });

        const user = await userRepository.findByEmail(email);
        if (!user) return res.status(200).json({ status: "success", message: "Si el email existe recibirás instrucciones" });

        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const expires = Date.now() + 3600000; // 1 hora

        await userRepository.setResetToken(user._id, hashedToken, new Date(expires));

        const resetUrl = `http://localhost:${envs.port}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

        const mailOptions = {
            from: `No responder - <${envs.mailUsername}>`,
            to: email,
            subject: "Recuperación de contraseña",
            html: `<p>Se solicitó restablecer tu contraseña. Hacé clic en el enlace (válido por 1 hora):</p>
                    <a href="${resetUrl}">Restablecer contraseña</a>
                    <p>Si no lo solicitaste, ignorá este correo.</p>`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ status: "success", message: "Email de recuperación enviado" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token, email, newPassword } = req.body;
        if (!token || !email || !newPassword) return res.status(400).json({ status: "error", message: "Token, email y newPassword requeridos" });

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await userRepository.findByResetToken(email, hashedToken);
        if (!user) return res.status(400).json({ status: "error", message: "Token inválido o expirado" });

        if (isValidPassword(newPassword, user.password)) {
            return res.status(400).json({ status: "error", message: "Nueva contraseña no puede ser igual a la actual" });
        }

        const hashedPassword = createHash(newPassword);
        await userRepository.updateUser(user._id, {
            password: hashedPassword
        });
        await userRepository.clearResetToken(user._id);

        return res.status(200).json({ status: "success", message: "Contraseña restablecida correctamente" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

// Legacy Users - solo admins (opcional no solicitado, lo dejo por cualquier eventualidad)

export const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getUsers();
        users 
            ? res.status(200).send({status: "success", payload: users})
            : res.status(404).json({status: "error", message: "No se encontraron usuarios"});
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await userRepository.getUserById(uid);
        user 
            ? res.status(200).send({status: "success", payload: user})
            : res.status(404).json({status: "error", message: "No se encontró el usuario solicitado"});
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = req.body;
        const editedUser = await userRepository.updateUser(uid, user);
        editedUser 
            ? res.status(201).send({status: "success", payload: editedUser})
            : res.status(404).json({status: "error", message: "No se pudo editar el usuario"});
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const deletedUser = await UsersDAO.deleteUser(uid);
        deletedUser
            ? res.status(200).send({status: "success", payload: deletedUser})
            : res.status(404).json({status: "error", message: "No se pudo eliminar el usuario"});
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}