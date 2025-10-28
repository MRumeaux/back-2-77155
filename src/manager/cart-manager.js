import { cartModel } from "../models/cart-model.js";

class CartManager {

    constructor(model){
        this.model = model;
    }
    
    createCart = async () => {
        try {
            return await this.model.create({ products: [] });
        } catch (error) {
            throw new Error(error);
        }
    }

    getCarts = async () => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(error);
        }
    }
    
    getCartById = async (cid) => {
        try {
            return await this.model.findById(cid).lean();
        } catch (error) {
            throw new Error(error);
        }
    }

    existProductInCart = async (cid, pid) => {
        try {
            return await this.model.findOne({
                _id: cid,
                products: { $elemMatch: { product: pid } }
            })
        } catch (error) {
            throw new Error(error);
        }
    }
    
    addProductToCart = async (cid, pid) => {
        try {
            const existingProd = await this.existProductInCart(cid, pid);
            if(existingProd){
                return await this.model.findOneAndUpdate(
                    { _id: cid, 'products.product': pid },
                    { $inc: { 'products.$.quantity': 1 } },
                    { new: true }
                )
            } else {
                return await this.model.findByIdAndUpdate(
                    cid,
                    { $push: { products: { product: pid, quantity: 1 } } },
                    { new: true }
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProductsInCart = async (cid, prod) => {
        try {
            const newProdCart = await this.model.findByIdAndUpdate(
                cid, prod, { new: true }
            );
            return newProdCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProductQuantityInCart = async (cid, pid, quantity) => {
        try {
            const updatedQProdCart = await this.model.findOneAndUpdate(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            );
            return updatedQProdCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProductInCartById = async (cid, pid) => {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProductsInCart = async (cid) => {
        try {
            const deletedCart = await this.model.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
            );
            return deletedCart;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const cartManager = new CartManager(cartModel);