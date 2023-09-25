import { responseHelper } from "../helper/responseHelper.js";
import { createProductModel, getProductModel,getProductIdModel } from "../models/productModel.js";

export const getProduct = async (req, res) => {
    try {
        const result = await getProductModel()
        return responseHelper(res, 200, "Success Get data", result)
    } catch (error) {
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}

export const getProductById = async (req, res) => {
    try {
        const result = await getProductIdModel(req)
        return responseHelper(res, 200, "Success Get data", result)
    } catch (error) {
        console.log(error,"error query");
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}

export const createProduct = async (req, res) => {
    try {
        const result = await createProductModel(req, res)
        return responseHelper(res, 201, "Updload Produk Sukses", result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}