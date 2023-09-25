import DBConnection from "../config/database.js";

const promise = DBConnection.promise()

export const getCartModel = async (req) => {
    const query = `SELECT c.id, c.product_id, c.user_id, c.qty, c.variant, c.price,
                   p.product_name, p.description , p.variant_name, p.image_url,
                   u.address, u.role_id ,u2.id as shop_id, u2.name as shop_name
                   FROM cart c
                   LEFT JOIN products p 
                   on p.id = c.product_id 
                   LEFT JOIN users u 
                   on u.id = c.user_id 
                   LEFT JOIN users u2 
                   on u2.id = p.user_id
                   WHERE c.user_id = ${req.id}
                   ORDER BY c.id DESC
                   `;
    const [rows] = await promise.query(query);
    return rows.length > 0 ? rows : []
}

export const addCartModel = async ({ qty, variant, product_id, user_id, price }) => {
    if(variant){
        const queryCheck = `SELECT product_id, variant,qty FROM cart where product_id = ${product_id} AND variant = ${variant}`
        const [rows] = await promise.query(queryCheck)
        if (rows.length > 0) {
            const queryUpdate = `UPDATE cart SET qty = ${rows[0].qty + qty} WHERE product_id = ${product_id} AND variant = ${variant}`
            const [affectedRows] = await promise.query(queryUpdate)
            console.log(affectedRows, "UPDATEEE");
            return affectedRows.affectedRows == 1 ? true : false
        }
    }
    const queryAdd = `INSERT INTO cart (qty,variant,product_id,user_id,price) 
                        VALUES ('${qty}','${variant}','${product_id}','${user_id}','${price}')`
    const [affectedRows] = await promise.query(queryAdd)
    console.log(affectedRows, "ADD");
    return affectedRows.affectedRows == 1 ? true : false

}