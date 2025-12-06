import { userModel } from "../models/users.model.js";

class Users {

    constructor(model){
        this.model = model;
    };

    getUsers = async () => {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    getUserById = async (uid) => {
        try {
            const user = await userModel.findById({_id: uid});
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    createUser = async (user) => {
        try {
            const newUser = await userModel.create(user);
            return newUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    updateUser = async (uid, user) => {
        try {
            const updatedUser = await userModel.findByIdAndUpdate({_id: uid}, {$set: user}, { new: true });
            return updatedUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteUser = async (uid) => {
        try {
            const deletedUser = await userModel.findByIdAndDelete({_id: uid});
            return deletedUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

}

export const UsersDAO = new Users(userModel);