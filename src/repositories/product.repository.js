import { productDao } from "../dao/classes/product.dao.js";

export const getProducts = async (page, limit, query, sort) => {
    try {
        return await productDao.getProducts(page, limit, query, sort);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getProductById = async (pid) => {
    try {
        const filteredProduct = await productDao.getProductById(pid);
        return filteredProduct || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addProduct = async (product) => {

    try {
        const newProduct = await productDao.addProduct(product);
        return newProduct || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export const updateProduct = async (pid, product) => {

    try {
        const updatedProduct = await productDao.updateProduct(pid, product, { new: true });
        return updatedProduct || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export const deleteProduct = async (pid) => {
    try {
        const deletedProduct = await productDao.deleteProduct(pid);
        return deletedProduct || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const decrementStock = async (pid, qty) => {
    const product = await productDao.getProductById(pid);
    if (!product) throw new Error("Product not found", 404);
    if (product.stock < qty) return null;
    return await productDao.updateProduct(pid, { stock: product.stock - qty });
};