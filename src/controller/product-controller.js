import * as productRepository from "../repositories/product.repository.js";

export const getProducts = async (req, res, next) => {
    try {
        const { page, limit, query, sort } = req.query;
        const response = await productRepository.getProducts(page, limit, query, sort);
        const nextPage = response.hasNextPage
            ? `http://localhost:8080/products?page=${response.nextPage}`
            : null;
        const prevPage = response.hasPrevPage
            ? `http://localhost:8080/products?page=${response.prevPage}`
            : null;
        res.status(200).json({
            status: "success",
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            prevLink: prevPage,
            nextLink: nextPage,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            page: response.page
        })
    } catch (error) {
        next(error);
    }
}
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filteredProduct = await productRepository.getProductById(id);
        if (!filteredProduct) return res.status(404).json({ message: "Product not found" })
        res.status(200).json(filteredProduct);
    } catch (error) {
        next(error);
    }
}
export const addProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const addProduct = await productRepository.addProduct(product);
        res.status(201).json(addProduct);
    } catch (error) {
        next(error);
    }
}
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await productRepository.updateProduct(id, product);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productRepository.deleteProduct(id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        next(error);
    }
}
