import { UsersDAO } from "../dao/classes/users.dao.js";

export const getUsers = async () => {
    try {
        return await UsersDAO.getUsers().lean();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserById = async (uid) => {
    try {
        return await UsersDAO.getUserById(uid).lean();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createUser = async (user) => {
    try {
        return await UsersDAO.createUser(user);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUser = async (uid, user) => {
    try {
        return await UsersDAO.updateUser(uid, user).lean();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteUser = async (uid) => {
    try {
        return await UsersDAO.deleteUser(uid).lean();
    } catch (error) {
        console.error(error);
        return null;
    }  
};

export const findByEmail = async (email) => {
    try {
        return await UsersDAO.findOne({ email });
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const setResetToken = async (id, hashedToken, expires) => {
    try {
        return await UsersDAO.updateUser(id, { resetToken: hashedToken, resetTokenExpires: expires });
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const findByResetToken = async (email, hashedToken) => {
    try {
        return await UsersDAO.findOne({
            email,
            resetToken: hashedToken,
            resetTokenExpires: { $gt: new Date() }
        });
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const clearResetToken = async (id) => {
    try {
        return await UsersDAO.updateUser(id, { resetToken: null, resetTokenExpires: null });
    } catch (error) {
        console.error(error);
        return null;
    }
};