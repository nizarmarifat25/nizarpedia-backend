
import { responseHelper } from "../helper/responseHelper.js";
import { getAllUsersModel, createUserModel } from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
    try {
        const result = await getAllUsersModel()
        return responseHelper(res, 200, "Success Get data", result)
    } catch (e) {
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: e
        })
        return
    }
}

export const createUser = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                messege: "password tidak cocok"
            })
        }
        const result = await createUserModel(req.body)
        if (result) {
            return responseHelper(res, 201, "Created User", req.body)
        }
        res.status(400).json({
            messege: "gagal create user"
        })
        return
    } catch (e) {
        res.status(500).json({
            messege: "INTERNAL SERVER ERROR",
            messegeServer: e
        })
        return
    }
}

export const updateUser = (req, res) => {
    res.json({
        messege: "Update user success",
        data: req.body
    })
}

export const deleteUser = (req, res) => {
    const id = req.params;
    res.json({
        msg: "delete sukses",
        data_id: id
    })
}

