import { cartManager } from "../manager/cart-manager.js";
import { getProductById } from "./product.repository.js";

export const createCart = async () => {
    try {
        return await cartManager.createCart();
    } catch (error) {
        throw new Error(error);
    }
}

export const getCarts = async () => {
    try {
        return await cartManager.getCarts();
    } catch (error) {
        throw new Error(error);
    }
}
    
export const getCartById = async (cid) => {
    try {
        return await cartManager.getCartById(cid);
    } catch (error) {
        throw new Error(error);
    }
}
    
export const addProductToCart = async (cid, pid) => {
    try {
        const existingCart = await getCartById(cid);
        const existingProd = await getProductById(pid);

        if (!existingCart) return new Error ("Could not find the cart");
        if (!existingProd) return new Error ("Could not find the product");

        return await cartManager.addProductToCart(cid, pid);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProductsInCart = async (cid, prod) => {
    try {
        return await cartManager.updateProductsInCart(cid, prod);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProductQuantityInCart = async (cid, pid, quantity) => {
    try {
        return await cartManager.updateProductQuantityInCart(cid, pid, quantity);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductInCartById = async (cid, pid) => {
    try {
        return await cartManager.deleteProductInCartById(cid, pid);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductsInCart = async (cid) => {
    try {
        return await cartManager.deleteProductsInCart(cid);
    } catch (error) {
        throw new Error(error);
    }
}
