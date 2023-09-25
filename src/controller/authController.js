import { responseHelper } from "../helper/responseHelper.js";
import DBConnection from "../config/database.js";
import jwt from 'jsonwebtoken'

const promise = DBConnection.promise()
const secretKey = "secretKey"

export const login = (req, res) => {
    const query = `SELECT * FROM users  WHERE email='${req.body.email}'`;
    console.log(query);
    promise.query(query)
        .then(([rows]) => {
            if (rows.length == 0) {
                return responseHelper(res, 400, "Email tidak ditemukan", [])
            }
            if (rows[0].password != req.body.password) {
                return responseHelper(res, 400, "Password salah")
            }
            if (rows[0].isLogin != 0) {
                return responseHelper(res, 400, "Akun sedang digunakan")
            }
            promise.query(`UPDATE users SET isLogin = ${1} WHERE id = ${rows[0].id}`)
                .then((rowsUpdate) => {
                    const payload = {
                        "id": rows[0].id,
                        "email": rows[0].email,
                        "name": rows[0].name,
                        "role_id": rows[0].role_id,
                        "address": rows[0].address
                    }
                    jwt.sign(payload, secretKey, (err, token) => {
                        responseHelper(res, 200, "Yeay login berhasil! selamat berbelanja ", payload, token)
                    })
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => {
            console.log(err);
        })
}

export const logout = (req, res) => {
    promise.query(`UPDATE users SET isLogin = ${0} WHERE id = ${req.body.id}`)
        .then(([rows]) => {
            if (rows.affectedRows === 0) {
                responseHelper(res, 400, "ID tidak ditemukan")
            } else {
                const auth = req.headers.authorization;
                const authSplit = auth.split(" ");
                if (authSplit.length < 2) {
                    res.status(201).send({
                        "status": 0,
                        "message": "Sudah logout"
                    });
                    return
                }
                res.clearCookie("JWT");
                res.status(201).send({
                    "status": 1,
                    "message": "logout"
                })
            }

        })
        .catch((err) => {
            console.log(err);
            responseHelper(res, 500, err,)
        })


}