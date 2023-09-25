import mysql from 'mysql2';


const DBConnection = mysql.createPool({
    host: '156.67.216.146',
    user: 'nizar',
    password: 'nizar123',
    database: 'nizarpedia'
});
// const DBConnection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });



export default DBConnection;