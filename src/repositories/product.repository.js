import { productManager } from "../manager/product-manager.js";

export const getProducts = async(page, limit, query, sort) => {
    try {
        return await productManager.getProducts(page, limit, query, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (pid) => {
        try {
            const filteredProduct = await productManager.getProductById(pid);
            if (!filteredProduct) throw new Error("Product not found", 404);
            return filteredProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

export const addProduct = async (product) => {
    
    try {
        const newProduct = await productManager.addProduct(product);
        if (!newProduct) throw new Error("Product could not be posted", 404);
        return newProduct;
    } catch (error) {
        throw new Error(error);
    }
}
export const updateProduct = async (pid, product) => {
    
    try {
        const updatedProduct = await productManager.updateProduct(pid, product, { new: true });
        if (!updatedProduct) throw new Error("Product was not updated", 404);
        return updatedProduct;
    } catch (error) {
        throw new Error(error);
    }
}
export const deleteProduct = async (pid) => {
    try {
        const deletedProduct = await productManager.deleteProduct(pid);
        if (!deletedProduct) throw new Error("Product was not deleted", 404);
        return deletedProduct;
    } catch (error) {
        throw new Error(error);
    }
}
