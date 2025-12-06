import { BusinessDAO } from "../dao/classes/business.dao.js";

export const getBusinesses = async (req, res) => {
    try {
        const businesses = await BusinessDAO.getBusinesses();
        businesses 
            ? res.status(200).send({status: "success", payload: businesses})
            : res.status(404).json({status: "error", message: "No se encontraron negocios"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const getBusinessById = async (req, res) => {
    try {
        const { bid } = req.params;
        const business = await BusinessDAO.getBusinessById(bid);
        business 
            ? res.status(200).send({status: "success", payload: business})
            : res.status(404).json({status: "error", message: "No se encontró el negocio solicitado"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
} 

export const createBusiness = async (req, res) => {
    try {
        const businessData = req.body;
        const newBusiness = await BusinessDAO.createBusiness(businessData);
        newBusiness 
            ? res.status(201).send({status: "success", payload: newBusiness})
            : res.status(404).json({status: "error", message: "No se pudo crear el negocio"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const addProductToBusiness = async (req, res) => {
    try {
        const { bid, pid } = req.params;
        const updatedProdToBusiness = await BusinessDAO.addProductToBusiness(bid, pid);
        updatedProdToBusiness 
            ? res.status(201).send({status: "success", payload: updatedProdToBusiness})
            : res.status(404).json({status: "error", message: "No se pudo agregar el producto elegido al negocio"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const editBusiness = async (req, res) => {
    try {
        const { bid } = req.params;
        const business = req.body;
        const updatedBusiness = await BusinessDAO.editBusiness(bid, business);
        updatedBusiness 
            ? res.status(201).send({status: "success", payload: updatedBusiness})
            : res.status(404).json({status: "error", message: "No se pudo editar el negocio"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}

export const deleteBusiness = async (req, res) => {
    try {
        const { bid } = req.params;
        const deletedBusiness = await BusinessDAO.deleteBusiness(bid);
        deletedBusiness 
            ? res.status(200).send({status: "success", payload: deletedBusiness})
            : res.status(404).json({status: "error", message: "No se pudo eliminar el negocio"});
    }
    catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
}