import { responseHelper } from "../helper/responseHelper.js";
import { createTransactionModel, getTransactionModel } from '../models/transcationModel.js'


export const createTransaction = async (req, res) => {
    try {
        const result = await createTransactionModel(req, res)
        return responseHelper(res, 201, "Updload Transaction Sukses", result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}

export const getTransaction = async (req, res) => {
    try {
        const result = await getTransactionModel(req.params.id)
        return responseHelper(res, 200, "Success Get data", result)

    } catch (error) {
        // console.log(error,"ERORR");
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}

