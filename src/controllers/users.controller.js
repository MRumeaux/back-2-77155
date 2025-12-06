import { UsersDAO } from "../dao/classes/users.dao.js";


export const getUsers = async (req, res) => {
    try {
        const users = await UsersDAO.getUsers();
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
        const user = await UsersDAO.getUserById(uid);
        user 
            ? res.status(200).send({status: "success", payload: user})
            : res.status(404).json({status: "error", message: "No se encontró el usuario solicitado"});
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = await UsersDAO.createUser();
        newUser
            ? res.status(201).send({status: "success", payload: newUser})
            : res.status(404).json({status: "error", message: "No se pudo crear el usuario"});
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = req.body;
        const editedUser = await UsersDAO.updateUser(uid, user);
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