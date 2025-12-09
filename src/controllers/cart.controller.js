import * as cartRepository from "../repositories/cart.repository.js";
import { decrementStock } from "../repositories/product.repository.js";
import { createTicket } from "../repositories/ticket.repository.js";
import TicketDTO from "../dto/ticketDTO.js";

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

export const purchaseCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const user = req.user;
        if (!user) return res.status(401).json({ message: "No autorizado" });

        const cart = await cartRepository.getCartById(cid);
        if (!cart || !cart.products?.length) return res.status(400).json({ message: "Carrito vacío o inexistente" });

        let total = 0;
        const notProcessed = [];

        for (const item of cart.products) {
            const pid = item.product._id?.toString() || item.product.toString();
            const qty = item.quantity;
            const updatedProduct = await decrementStock(pid, qty); // retorna null si no alcanza
            if (updatedProduct) {
                const price = item.product.price ?? 0;
                total += price * qty;
            } else {
                notProcessed.push(pid);
            }
        }

        const ticket = await createTicket({ amount: total, purchaser: user.email });

        await clearProcessedProducts(cid, notProcessed);

        return res.status(201).json({ message: "Se completó el pedido", ticket: new TicketDTO(ticket), notProcessed: notProcessed });
    } catch (error) { 
        next(error); 
    }
}