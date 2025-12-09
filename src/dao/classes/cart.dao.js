import { cartModel } from "../models/cart.model.js";

class CartManager {

    constructor(model){
        this.model = model;
    }
    
    createCart = async () => {
        try {
            return await this.model.create({ products: [] });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getCarts = async () => {
        try {
            return await this.model.find();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    getCartById = async (cid) => {
        try {
            return await this.model.findById(cid).lean();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    existProductInCart = async (cid, pid) => {
        try {
            return await this.model.findOne({
                _id: cid,
                products: { $elemMatch: { product: pid } }
            })
        } catch (error) {
            console.error(error);
            return null;
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
            console.error(error);
            return null;
        }
    }

    updateProductsInCart = async (cid, prod) => {
        try {
            const newProdCart = await this.model.findByIdAndUpdate(
                cid, prod, { new: true }
            );
            return newProdCart;
        } catch (error) {
            console.error(error);
            return null;
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
            console.error(error);
            return null;
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
            console.error(error);
            return null;
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
            console.error(error);
            return null;
        }
    }

}

export const cartDAO = new CartManager(cartModel);