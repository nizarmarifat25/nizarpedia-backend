import DBConnection from "../config/database.js";
import { scheduleJob } from 'node-schedule'

const promise = DBConnection.promise()

export const createTransactionModel = async (req, res) => {
    let body = req.body
    if (!body) {
        return res.status(400).json({ 'msg': "bad request" })
    }
    const query = `INSERT INTO transaction (product_id, user_id, sub_total, price, quantity, variant, status_transaction)
                   VALUES ('${body.product_id}', '${body.user_id}','${body.sub_total}','${body.price}','${body.quantity}','${body.variant}','DIKEMAS')`
    const [affectedRows] = await promise.query(query)
    return affectedRows.affectedRows == 1 ? true : false
}


const jobDelivery = async () => {
    console.count();
    const query = `SELECT * FROM transaction`
    promise.query(query)
        .then(([rows]) => {
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].status_transaction == "DIKEMAS") {
                    promise.query(`UPDATE transaction SET status_transaction = 'DIKIRIM' WHERE id = ${rows[i].id}`)
                }
                if (rows[i].status_transaction == "DIKIRIM") {
                    promise.query(`UPDATE transaction SET status_transaction = 'DITERIMA' WHERE id = ${rows[i].id}`)
                }
            }

        })
        .catch((err) => {
            console.log(err);
        })
}
scheduleJob('*/5 * * * *', jobDelivery)

export const getTransactionModel = async (id) => {
    const query = `select t.id, t.sub_total, t.product_id, t.sub_total, t.price, t.quantity, t.variant, t.status_transaction ,
                    u.address, u2.name as shop_name, u2.address as shop_address,
                    p.product_name, p.description , p.variant_name, p.image_url
                    from transaction t 
                    left join products p 
                    on p.id = t.product_id 
                    left join users u 
                    on u.id = t.user_id 
                    left join users u2 
                    on u2.id = p.user_id
                    where t.user_id = ${id}
                    order by t.id desc
                    `;
    const [rows] = await promise.query(query);
    return rows.length > 0 ? rows : null;
}
