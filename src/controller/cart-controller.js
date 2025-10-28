import * as cartRepository from "../repositories/cart.repository.js";

export const createCart = async (req, res, next) => {
    try {
        const cart = await cartRepository.createCart();
        res.status(201).json(cart);
    } catch (error) {
        next(error)
    }

};

export const getCarts = async (req, res, next) => {
    try {
        const carts = await cartRepository.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        next(error)
    }
};
    
export const getCartById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const carts = await cartRepository.getCartById(cid);
        res.status(200).json(carts);
    } catch (error) {
        next(error)
    }
};
    
export const addProductToCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const postedProductInCart = await cartRepository.addProductToCart(cid, pid);
        res.status(201).json(postedProductInCart);
    } catch (error) {
        next(error)
    }
};    

export const updateProductsInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const postedProductInCart = await cartRepository.updateProductsInCart(cid, req.body);
        res.status(201).json(postedProductInCart);
    } catch (error) {
        next(error)
    }
};

export const updateProductQuantityInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { quantity } = req.body;
        const postedProductInCart = await cartRepository.updateProductQuantityInCart(cid, quantity);
        res.status(201).json(postedProductInCart);
    } catch (error) {
        next(error)
    }
};

export const deleteProductInCartById = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const postedProductInCart = await cartRepository.deleteProductInCartById(cid, pid);
        res.status(201).json(postedProductInCart);
    } catch (error) {
        next(error)
    }
};

export const deleteProductsInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const postedProductInCart = await cartRepository.deleteProductsInCart(cid);
        res.status(201).json(postedProductInCart);
    } catch (error) {
        next(error)
    }
};
