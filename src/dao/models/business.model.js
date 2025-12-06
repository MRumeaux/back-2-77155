import {Schema, model} from "mongoose";

const BusinessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: []
});

export const businessModel = model("Business", BusinessSchema);