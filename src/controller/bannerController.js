import { responseHelper } from "../helper/responseHelper.js";
import { createBannerModel, getBannerModel } from "../models/bannerModel.js"

export const getBanner = async (req, res) => {
    try {
        const result = await getBannerModel()
        return responseHelper(res, 200, "Success Get data", result)
    } catch (error) {
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}

export const createBanner = async (req, res) => {
    try {
        const result = await createBannerModel(req, res)
        return responseHelper(res, 201, "Updload Banner Sukses",result)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: error
        })
        return
    }
}