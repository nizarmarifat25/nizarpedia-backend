import { responseHelper } from "../helper/responseHelper.js";
import { addCartModel, getCartModel } from "../models/cartModel.js";

export const getCart = async (req, res) => {
    try {
        const result = await getCartModel(req.params)
        return responseHelper(res, 200, "Success Get data", result)
    } catch (error) {
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}

export const addCart = async (req, res) => {
    try {
        const result = await addCartModel(req.body, res)
        return responseHelper(res, 201, "Berhasil menambahkan ke keranjang", result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}