import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
});

cartSchema.pre("find", function () {
    this.populate("products.product");
});

cartSchema.pre("findById", function () {
    this.populate("products.product");
});

cartSchema.pre("findByIdAndUpdate", function () {
    this.populate("products.product");
});

cartSchema.pre("findOne", function () {
    this.populate("products.product");
});

cartSchema.pre("findOneAndUpdate", function () {
    this.populate("products.product");
});


export const cartModel = model("cart", cartSchema);