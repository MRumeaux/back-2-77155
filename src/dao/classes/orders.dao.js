import { ordersModel } from "../models/orders.model.js";

class Order {

    constructor(model){
        this.model = model;
    }

    getOrders = async () => {
        try {
            const orders = await ordersModel.find();
            return orders;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    getOrderById = async (oid) => {
        try {
            const order = await ordersModel.findById({_id: oid});
            return order;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    createOrder = async (order) => {
        try {
            const newOrder = await ordersModel.create(order);
            return newOrder;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    // revisar
    resolveOrder = async (oid) => {
        try {
            const resolvedOrder = await ordersModel.findByIdAndUpdate({_id: oid});
            return resolvedOrder;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteOrder = async (oid) => {
        try {
            const deletedOrder = await ordersModel.findByIdAndDelete({_id: oid});
            return deletedOrder;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

}

export const OrderDAO = new Order(ordersModel);