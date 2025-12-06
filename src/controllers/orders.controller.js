import { OrderDAO } from "../dao/classes/orders.dao.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await OrderDAO.getOrders();
        orders 
            ? res.status(200).send({status: "success", payload: orders})
            : res.status(404).json({status: "error", message: "No se encontraron órdenes"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { oid } = req.params;
        const order = await OrderDAO.getOrderById(oid);
        order 
            ? res.status(200).send({status: "success", payload: order})
            : res.status(404).json({status: "error", message: "No se encontró la orden solicitada"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const createOrder = async (req, res) => {
    try {
        const orderData = req.body; 
        const newOrder = await OrderDAO.createOrder(orderData);
        newOrder 
            ? res.status(201).send({status: "success", payload: newOrder})
            : res.status(404).json({status: "error", message: "No se pudo crear la orden"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const resolveOrder = async (req, res) => {
    try {
        const { oid } = req.params;
        const resolvedOrder = await OrderDAO.resolveOrder(oid);
        resolvedOrder 
            ? res.status(200).send({status: "success", payload: resolvedOrder})
            : res.status(404).json({status: "error", message: "La orden no pudo ser resuelta"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }   
}

export const deleteOrder = async (req, res) => {
    try {
        const { oid } = req.params;
        const deletedOrder = await OrderDAO.deleteOrder(oid);
        deletedOrder 
            ? res.status(200).send({status: "success", payload: deletedOrder})
            : res.status(404).json({status: "error", message: "No se pudo eliminar la orden"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}