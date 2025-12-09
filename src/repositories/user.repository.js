import { UsersDAO } from "../dao/classes/users.dao";

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

