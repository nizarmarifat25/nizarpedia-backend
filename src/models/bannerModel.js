import DBConnection from "../config/database.js";
import path from 'path'

const promise = DBConnection.promise()

export const getBannerModel = async () => {
    const query = "SELECT * FROM banner";
    const [rows] = await promise.query(query);
    return rows.length > 0 ? rows : null
}

export const createBannerModel = async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ 'msg': "No file updaloaded" })
    }
    const name = req.body.title
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`

    if (fileSize > 5000000) {
        return res.status(422).json({
            msg: "Img must be less than 5MB"
        })
    }
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
        try {
            const query = `INSERT INTO banner (name,url)
                           VALUES ('${name}','${url}')`
            const [affectedRows] = await promise.query(query)
            return affectedRows.affectedRows == 1 ? true : false
        } catch (error) {
            console.log(error.message);
        }
    })
}