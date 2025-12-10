import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: "Orders"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Carts"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpires: {
        type: Date,
        default: null
    }
});

export const userModel = model("User", UserSchema);