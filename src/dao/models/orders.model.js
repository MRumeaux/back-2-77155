import {Schema, model} from "mongoose";

const OrderSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    business: {
        type: Schema.Types.ObjectId, 
        ref: "Business",
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    products: [],
    totalPrice: {
        type: Number
    }
});

export const ordersModel = model("Orders", OrderSchema);