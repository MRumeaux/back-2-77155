import { businessModel } from "../models/business.model.js";

class Business {

    constructor(model){
        this.model = model;
    }

    getBusinesses = async () => {
        try {
            const businesses = await bussinesModel.find();
            return businesses;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    getBusinessById = async (bid) => {
        try {
            const business = await businessModel.findById({_id: bid});
            return business;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    createBusiness = async (business) => {
        try {
            const newBusiness = await businessModel.create(business);
            return newBusiness;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    existProductInBusiness = async (bid, pid) => {
        try {
            return await businessModel.findOne({
                _id: bid,
                products: { $elemMatch: { product: pid } }
            })
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    addProductToBusiness = async (bid, pid) => {
        try {
            const existingProd = await this.existProductInBusiness(bid, pid);
            if(existingProd){
                return await businessModel.findOneAndUpdate(
                    { _id: bid, 'products.product': pid },
                    { $inc: { 'products.$.quantity': 1 } },
                    { new: true }
                )
            } else {
                return await businessModel.findByIdAndUpdate(
                    bid,
                    { $push: { products: { product: pid, quantity: 1 } } },
                    { new: true }
                );
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    updateBusiness = async (bid, business) => {
        try {
            const updatedBusiness = await businessModel.findByIdAndUpdate({_id: bid}, {$set: business}, { new: true });
            return updatedBusiness;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    deleteBusiness = async (bid) => {
        try {
            const deletedBusiness = await ordersModel.findByIdAndDelete({_id: bid});
            return deletedBusiness;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

}

export const BusinessDAO = new Business(businessModel);