import { cartDAO } from "../dao/classes/cart.dao.js";
import { getProductById } from "./product.repository.js";

export const createCart = async () => {
    try {
        return await cartDAO.createCart();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCarts = async () => {
    try {
        return await cartDAO.getCarts();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCartById = async (cid) => {
    try {
        return await cartDAO.getCartById(cid);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addProductToCart = async (cid, pid) => {
    try {
        const existingCart = await getCartById(cid);
        const existingProd = await getProductById(pid);

        if (!existingCart) return new Error("Could not find the cart");
        if (!existingProd) return new Error("Could not find the product");

        return await cartDAO.addProductToCart(cid, pid);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateProductsInCart = async (cid, prod) => {
    try {
        return await cartDAO.updateProductsInCart(cid, prod);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateProductQuantityInCart = async (cid, pid, quantity) => {
    try {
        return await cartDAO.updateProductQuantityInCart(cid, pid, quantity);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteProductInCartById = async (cid, pid) => {
    try {
        return await cartDAO.deleteProductInCartById(cid, pid);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteProductsInCart = async (cid) => {
    try {
        return await cartDAO.deleteProductsInCart(cid);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const clearProcessedProducts = async (cid, notProcessedProductIds = []) => {
    return await cartDAO.findByIdAndUpdate(
        cid,
        { $set: 
            { products: 
                (await cartDAO.findById(cid)).products.filter(p => notProcessedProductIds.includes(p.product.toString())) 
            } 
        },
        { new: true }
    ).populate("products.product");
}