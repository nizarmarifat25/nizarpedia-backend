import DBConnection from "../config/database.js";
const promise = DBConnection.promise()

export const getAllUsersModel = async () => {
    const query = "SELECT * FROM users";
    const [rows] = await promise.query(query);
    return rows.length > 0 ? rows : null
}

export const createUserModel = async ({ name, email, address, password, role_id }) => {
    const query = `INSERT INTO users (name,email,address,password,role_id,isLogin) 
                    VALUES ('${name}','${email}','${address}','${password}','${role_id}',${0})`
    const [affectedRows] = await promise.query(query)
    return affectedRows.affectedRows == 1 ? true : false
}

// export const getUserFindOneModel = async (username) => {
//     const query = `SELECT * FROM users where username =  ${username}`;
//     const [rows, fields] = await promise.query(query);
//     return rows.length > 0 ? rows : null
// }