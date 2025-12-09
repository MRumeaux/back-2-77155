import { TicketModel } from "../models/tickets.model.js";

class TicketManager {
    
    constructor(model){
        this.model = model
    }
    createTicket = async ({ code, amount, purchaser }) => {
        try {
            return await this.model.create({ code, amount, purchaser });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    findTicketById = async (tid) => {
        try {
            return await this.model.findById(tid).lean();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    findTicketByCode = async (code) => {
        try {
            return await this.model.findOne({ code }).lean();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export const ticketDAO = new TicketManager(TicketModel);