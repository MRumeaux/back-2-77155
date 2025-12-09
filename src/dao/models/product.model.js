import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true, // elimina espacios extra
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true, // normaliza el ingreso
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
    },
    status: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [String], 
        validate: {
            validator: function (arr) {
                return arr.every((url) => typeof url === "string" && url.length > 0);
            },
            message: "All URL's must be valid",
        },
        default: [],
    },
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model("product", productSchema);
