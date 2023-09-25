import DBConnection from "../config/database.js";
import path from 'path'

const promise = DBConnection.promise()

export const getProductModel = async () => {
    const query = "SELECT * FROM products";
    const [rows] = await promise.query(query);
    return rows.length > 0 ? rows : null
}

export const getProductIdModel = async (req) => {
    const query = `SELECT p.id, p.product_name, p.price, p.user_id, p.qty, p.description, p.image_url, p.category_id, p.variant_name, p.variant, 
                   u.id as shop_id, u.name as shop_name
                   FROM products p
                   LEFT JOIN users u
                   on p.user_id = u.id
                   WHERE p.id =  ${req.params.id}`;
    const [rows] = await promise.query(query);
    return rows.length > 0 ? rows : null
}

export const createProductModel = async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ 'msg': "No file updaloaded" })
    }
    const name = req.body.product_name
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
            const query = `INSERT INTO products (product_name, price, user_id, qty, description, image_url, category_id, variant, variant_name)
                           VALUES ('${name}','${req.body.price}','${req.body.users_id}','${req.body.qty}','${req.body.description}','${url}','${req.body.category_id}','${req.body.variant}','${req.body.variant_name}')`
            const [affectedRows] = await promise.query(query)
            return affectedRows.affectedRows == 1 ? true : false
        } catch (error) {
            console.log(error.message);
        }
    })
}