import { ticketDAO } from "../dao/classes/ticket.dao.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

export const createTicket = async ({ amount, purchaser }) => {
    try {
        const code = nanoid();
        return await ticketDAO.createTicket({ code, amount, purchaser });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const findTicketById = async (tid) => {
    try {
        return await ticketDAO.findTicketById(tid);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const findTicketByCode = async (code) => {
    try {
        return await ticketDAO.findTicketByCode(code);
    } catch (error) {
        console.error(error);
        return null;
    }
}

